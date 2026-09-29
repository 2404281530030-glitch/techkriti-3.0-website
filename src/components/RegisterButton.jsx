// src/components/RegisterButton.jsx
import React from 'react';
import { motion } from 'framer-motion';


function RegisterButton({ href = 'https://Techkriti2.vercel.app/' }) {
  const buttonStyle = {
    background: 'linear-gradient(90deg, #00c1ff, #e000ff)',
    border: 'none',
    borderRadius: '50px',
    padding: '1rem 2rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: 'white',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: '2rem'
  };

  return (
  <a href={href} target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
      <motion.button
        style={buttonStyle}
        whileHover={{ scale: 1.1,
          // Add a subtle shadow glow on hover
          boxShadow: "0px 0px 15px 0px #00c1ff"
        }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        Register Now
      </motion.button>
    </a>
  );
}

export default RegisterButton;