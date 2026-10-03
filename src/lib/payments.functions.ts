import { createServerFn } from "@tanstack/react-start";
import { createHmac, timingSafeEqual } from "crypto";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

function keys() {
  const id = process.env["RAZORPAY_KEY_ID"];
  const secret = process.env["RAZORPAY_KEY_SECRET"];
  if (!id || !secret) throw new Error("Online payment is not configured yet. Please contact the organisers.");
  return { id, secret };
}

export const createFeeOrder = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabase, userId } = context;
    const { data: me, error } = await supabase
      .from("participants")
      .select("participant_code, full_name, email, phone, college, payment_status")
      .eq("user_id", userId)
      .single();
    if (error || !me) throw new Error("Participant profile not found");
    if (me.payment_status === "paid") throw new Error("Fee already paid");
    if (!me.full_name || !me.phone || !me.college) throw new Error("Complete your profile first");

    const { data: settings } = await supabase.from("settings").select("fee_amount, registrations_open").eq("id", 1).single();
    if (!settings?.registrations_open) throw new Error("Registrations are closed");
    const amount = settings.fee_amount;

    const { id, secret } = keys();
    const res = await fetch("https://api.razorpay.com/v1/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64"),
      },
      body: JSON.stringify({ amount: amount * 100, currency: "INR", receipt: me.participant_code, notes: { user_id: userId } }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`Razorpay order failed [${res.status}]: ${body}`);
      throw new Error("Could not start payment. Please try again.");
    }
    const order = (await res.json()) as { id: string; amount: number };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("participants").update({ razorpay_order_id: order.id }).eq("user_id", userId);

    return { orderId: order.id, amount: order.amount, keyId: id, name: me.full_name, email: me.email, phone: me.phone };
  });

type RzPayment = { id: string; status: string; amount: number; order_id: string };

async function rzGet<T>(path: string): Promise<T> {
  const { id, secret } = keys();
  const res = await fetch(`https://api.razorpay.com/v1${path}`, {
    headers: { Authorization: "Basic " + Buffer.from(`${id}:${secret}`).toString("base64") },
  });
  if (!res.ok) {
    console.error(`Razorpay GET ${path} failed [${res.status}]: ${await res.text()}`);
    throw new Error("Could not reach payment gateway. Please try again.");
  }
  return (await res.json()) as T;
}

async function markPaid(userId: string, p: RzPayment) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("participants").update({
    payment_status: "paid",
    razorpay_payment_id: p.id,
    amount_paid: Math.round(p.amount / 100),
    paid_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }).eq("user_id", userId);
  if (error) throw new Error("Could not record payment");
}

export const verifyFeePayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) =>
    z.object({
      razorpay_order_id: z.string().min(5).max(100),
      razorpay_payment_id: z.string().min(5).max(100),
      razorpay_signature: z.string().min(10).max(200),
    }).parse(d),
  )
  .handler(async ({ data, context }) => {
    const { secret } = keys();
    const expected = createHmac("sha256", secret).update(`${data.razorpay_order_id}|${data.razorpay_payment_id}`).digest("hex");
    const a = Buffer.from(expected);
    const b = Buffer.from(data.razorpay_signature);
    if (a.length !== b.length || !timingSafeEqual(a, b)) throw new Error("Payment verification failed");

    const { data: me } = await context.supabase
      .from("participants").select("razorpay_order_id").eq("user_id", context.userId).single();
    if (me?.razorpay_order_id !== data.razorpay_order_id) throw new Error("Order mismatch");

    const p = await rzGet<RzPayment>(`/payments/${encodeURIComponent(data.razorpay_payment_id)}`);
    if (p.order_id !== data.razorpay_order_id || !["captured", "authorized"].includes(p.status))
      throw new Error("Payment not completed yet");
    await markPaid(context.userId, p);
    return { ok: true };
  });

// Recovers payments where the browser closed before verification finished.
export const syncFeePayment = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: me } = await context.supabase
      .from("participants").select("razorpay_order_id, payment_status").eq("user_id", context.userId).single();
    if (me?.payment_status === "paid") return { paid: true };
    if (!me?.razorpay_order_id) return { paid: false };
    const list = await rzGet<{ items: RzPayment[] }>(`/orders/${encodeURIComponent(me.razorpay_order_id)}/payments`);
    const ok = list.items.find((p) => p.status === "captured" || p.status === "authorized");
    if (!ok) return { paid: false };
    await markPaid(context.userId, ok);
    return { paid: true };
  });
