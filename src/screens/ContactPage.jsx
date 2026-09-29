import React from 'react';
import { motion } from 'framer-motion';

function ContactPage() {
  const pageStyle = {
    padding: '8rem 2rem 2rem 2rem',
    textAlign: 'center',
    minHeight: '100vh',
  };

  const linkBoxStyle = {
    background: '#2a2a2a',
    border: '1px solid #444',
    borderRadius: '8px',
    padding: '2rem',
    maxWidth: '500px',
    margin: '2rem auto',
    textDecoration: 'none',
    color: '#fff',
    display: 'block',
    fontSize: '1.5rem',
  };

  return (
    <div style={pageStyle}>
      <h1>Get In Touch</h1>
      <p>Follow us on our social channels and feel free to reach out!</p>
      
      
      <motion.a 
        href="https://www.instagram.com/tech_kriti.kashi?igsh=MXFocmFlaDdqemx5Mw==" // Add your link here
        style={linkBoxStyle} 
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px 0px #e000ff" }}
      >
        Follow us on Instagram
      </motion.a>
      
      <motion.a 
        href="https://www.linkedin.com/company/techkriti-kashi/" 
        style={linkBoxStyle} 
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px 0px #00c1ff" }}
      >
        Connect on LinkedIn
      </motion.a>
      
      <motion.a 
        href="mailto:techkriti2025@gmail.com" 
        style={linkBoxStyle} 
        whileHover={{ scale: 1.05, boxShadow: "0px 0px 15px 0px #ccc" }}
      >
        Email: techkriti2025@gmail.com
      </motion.a>
      
    </div>
  );
}

export default ContactPage;