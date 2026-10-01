export type TKEvent = {
  slug: string;
  title: string;
  dept: string;
  type: string;
  brief: string;
  team: boolean;
  maxTeam: number; // 1 = solo
  image: string;
  day: 1 | 2;
  time: string;
  venue: string;
  flagship?: boolean;
  minTeam?: number;
  prize?: string;
};

export const DEPARTMENTS = [
  "Flagship",
  "CSE / AI & ML / BCA / MCA",
  "ECE / EC & EN",
  "Mechanical",
  "Biotechnology",
  "Open / Common",
] as const;

export const events3: TKEvent[] = [
  // Flagship
  { slug: "hackathon", title: "24-Hour Hackathon", dept: "Flagship", type: "Team · Interdisciplinary", flagship: true,
    brief: "Interdisciplinary teams work on real-world problem statements and develop a software, hardware, AI, IoT or other technology-based solution for final presentation.",
    team: true, minTeam: 2, maxTeam: 6, prize: "₹10,000", image: "/hackathon.jpeg", day: 1, time: "12:00 PM (24 hrs)", venue: "EV-4 (Management Building)" },
  { slug: "tech-exhibition", title: "Tech Exhibition", dept: "Flagship", type: "Exhibition", flagship: true,
    brief: "Students display working models, projects, prototypes, IoT systems, software solutions, AI projects and engineering innovations and explain them to judges and visitors.",
    team: true, minTeam: 4, maxTeam: 5, prize: "₹10,000", image: "/tech-exhibition.jpeg", day: 1, time: "11:00 AM – 01:30 PM", venue: "College Passage" },
  { slug: "startup-expo", title: "Startup Expo", dept: "Flagship", type: "Pitch", flagship: true,
    brief: "Students or teams present innovative ideas, startup concepts or solutions to real-world problems, covering the problem, solution, uniqueness and implementation.",
    team: true, minTeam: 2, maxTeam: 6, prize: "₹10,000", image: "/startup-expo.png", day: 2, time: "10:00 AM onward", venue: "Main Stage" },

  // CSE
  { slug: "pseudo-code-war", title: "Pseudo Code War", dept: "CSE / AI & ML / BCA / MCA", type: "Practical",
    brief: "Solve programming problems using pseudocode instead of complete code. Tests logical thinking, algorithm design, problem-solving and programming concepts.",
    team: false, maxTeam: 1, image: "/pseudocode.png", day: 2, time: "10:00 AM – 12:00 PM", venue: "Lab 4 & 5 (Library Building)" },
  { slug: "web-sprint", title: "Web Sprint", dept: "CSE / AI & ML / BCA / MCA", type: "Practical",
    brief: "Receive a small problem statement and build a working website using HTML, CSS and JavaScript. Judged on functionality, correctness and completion.",
    team: false, maxTeam: 1, image: "/codecrackers .png", day: 1, time: "12:00 PM – 02:00 PM", venue: "Lab 1 & 2 (Library Building)" },
  { slug: "debugging-contest", title: "Debugging Contest", dept: "CSE / AI & ML / BCA / MCA", type: "Practical",
    brief: "Programs full of syntax, logical and runtime errors — find and fix them all before the clock runs out.",
    team: false, maxTeam: 1, image: "/Debugging.jpeg", day: 1, time: "02:00 PM – 04:00 PM", venue: "Lab 1 & 2 (Library Building)" },
  { slug: "fastest-typing", title: "Fastest Typing Challenge", dept: "CSE / AI & ML / BCA / MCA", type: "Practical",
    brief: "Type a common passage. Results combine typing speed and accuracy.",
    team: false, maxTeam: 1, image: "/fastest-typing.jpeg", day: 2, time: "12:00 PM – 02:00 PM", venue: "Lab 1 & 2 (Library Building)" },

  // ECE
  { slug: "circuitiq", title: "CircuitIQ", dept: "ECE / EC & EN", type: "Practical + Technical",
    brief: "Rapid-fire technical questions, electronic component identification and circuit-solving challenges against the clock.",
    team: false, maxTeam: 1, image: "/gallery12.jpeg", day: 1, time: "12:00 PM – 02:00 PM", venue: "Electronics Lab" },
  { slug: "electro-treasure-hunt", title: "Electro Treasure Hunt", dept: "ECE / EC & EN", type: "Technical + Adventure",
    brief: "Follow a chain of technical clues involving circuits, components and logic to reach checkpoints and crack the final challenge.",
    team: true, maxTeam: 4, image: "/gallery14.jpeg", day: 2, time: "10:00 AM – 12:00 PM", venue: "Campus-wide" },

  // Mechanical
  { slug: "cad-clash", title: "CAD Clash", dept: "Mechanical", type: "Practical",
    brief: "Create or modify a mechanical component using CAD software. Judged on accuracy, dimensions, design and completion.",
    team: false, maxTeam: 1, image: "/gallery16.jpeg", day: 1, time: "02:00 PM – 04:00 PM", venue: "CAD Lab" },
  { slug: "mechanic-mind", title: "Mechanic Mind", dept: "Mechanical", type: "Practical",
    brief: "Mechanical reasoning, engineering puzzles and practical problem-solving that test concepts, observation and decision-making.",
    team: false, maxTeam: 1, image: "/gallery18.jpeg", day: 2, time: "12:00 PM – 02:00 PM", venue: "Mechanical Workshop" },

  // Biotech
  { slug: "bioquest", title: "BioQuest", dept: "Biotechnology", type: "Technical + Quiz",
    brief: "Quiz covering microbiology, genetics, molecular biology, biotech applications and basic lab knowledge.",
    team: false, maxTeam: 1, image: "/gallery20.jpeg", day: 1, time: "12:00 PM – 02:00 PM", venue: "Biotech Seminar Room" },
  { slug: "lab-master", title: "Lab Master", dept: "Biotechnology", type: "Practical",
    brief: "Identify lab equipment, glassware, instruments, biological images and safety symbols, then answer questions on their use.",
    team: false, maxTeam: 1, image: "/gallery22.jpeg", day: 2, time: "10:00 AM – 12:00 PM", venue: "Biotech Lab" },
  { slug: "case-mastery", title: "Case Mastery", dept: "Biotechnology", type: "Case-Based",
    brief: "Teams receive a biotech case with clues, analyse it using scientific reasoning and present their conclusion.",
    team: true, maxTeam: 3, image: "/gallery24.jpeg", day: 2, time: "12:00 PM – 02:00 PM", venue: "Biotech Seminar Room" },

  // Open
  { slug: "memory-master", title: "Memory Master", dept: "Open / Common", type: "Open",
    brief: "Images, numbers, objects and symbols flash for a limited time — then answer questions from memory alone.",
    team: false, maxTeam: 1, image: "/memory-master.jpeg", day: 2, time: "12:00 PM – 02:00 PM", venue: "Seminar Hall, 3rd floor CRC" },
  { slug: "mobile-gaming", title: "Mobile Gaming – BGMI & Free Fire", dept: "Open / Common", type: "Esports",
    brief: "Competitive mobile gaming for solo or squad participation. Final titles and rules announced by the committee.",
    team: true, maxTeam: 4, image: "/mobile-gaming.jpeg", day: 2, time: "10:00 AM – 12:00 PM", venue: "Block B" },
  { slug: "virtual-escape-room", title: "Virtual Escape Room", dept: "Open / Common", type: "Team Puzzle",
    brief: "Teams solve a sequence of clues, puzzles and challenges inside a digital escape-room setup.",
    team: true, maxTeam: 3, image: "/ver.jpeg", day: 1, time: "02:00 PM – 04:00 PM", venue: "Lab 4 & 5 (Library Building)" },
  { slug: "battle-of-minds", title: "Battle of Minds – Debate", dept: "Open / Common", type: "Debate",
    brief: "Present and defend your views on given topics. Tests communication, logic, confidence and rebuttal skills.",
    team: false, maxTeam: 1, image: "/debate.jpeg", day: 2, time: "10:00 AM – 12:00 PM", venue: "Seminar Hall, 2nd floor CRC" },
  { slug: "project-showcase", title: "Project Showcase", dept: "Open / Common", type: "Showcase",
    brief: "Present innovative projects, prototypes or working models — demonstrate, explain applications and face the judges.",
    team: true, maxTeam: 4, image: "/project-showcase.png", day: 1, time: "02:00 PM – 04:00 PM", venue: "Seminar Hall, 2nd floor CRC" },
  { slug: "quiz", title: "Quiz", dept: "Open / Common", type: "Quiz",
    brief: "Mixed technical and non-technical quiz: technology, science, GK, current affairs and logical reasoning.",
    team: true, maxTeam: 2, image: "/quiz.jpeg", day: 1, time: "12:00 PM – 02:00 PM", venue: "Seminar Hall, 2nd floor CRC" },
];

export const eventBySlug = (slug: string) => events3.find((e) => e.slug === slug);

export const ceremonies = [
  { day: 1 as const, time: "09:00 AM – 11:00 AM", title: "Opening Ceremony", venue: "Main Stage" },
  { day: 2 as const, time: "02:00 PM – 04:00 PM", title: "Closing Ceremony & Prize Distribution", venue: "Main Stage" },
];

export const FEST_START = "2026-11-27T09:00:00+05:30";
