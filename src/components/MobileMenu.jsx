// src/components/MobileMenu.jsx
import React from 'react';
import { Link } from '@tanstack/react-router';
import { motion } from 'framer-motion';

// --- STYLES ---

// This is the full-screen backdrop
const menuBackdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0, 0, 0, 0.8)',
  backdropFilter: 'blur(10px)',
  zIndex: 40, // Below the navbar, but above the content
};

// This is the container for the links
const menuContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  gap: '2.5rem',
};

// Style for the links themselves
const menuLinkStyle = {
  fontSize: '2rem',
  color: '#fff',
  textDecoration: 'none',
  fontWeight: 'bold',
};

// --- ANIMATION VARIANTS ---

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.3 } },
};

const menuVariants = {
  hidden: { transition: { staggerChildren: 0.05, staggerDirection: -1 } },
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const linkVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300 } },
};

function MobileMenu({ closeMenu }) {
  return (
    <motion.div
      style={menuBackdropStyle}
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
      onClick={closeMenu} // Close if clicking on the backdrop
    >
      <motion.div 
        style={menuContainerStyle}
        variants={menuVariants}
        // Prevent backdrop click from closing when clicking *on* the menu
        onClick={(e) => e.stopPropagation()} 
      >
        <motion.div variants={linkVariants}>
          <Link to="/" style={menuLinkStyle} onClick={closeMenu}>Home</Link>
        </motion.div>
        <motion.div variants={linkVariants}>
          <Link to="/events" style={menuLinkStyle} onClick={closeMenu}>Events</Link>
        </motion.div>
        <motion.div variants={linkVariants}>
          <a href="https://Techkriti2.vercel.app/" target="_blank" rel="noopener noreferrer" style={menuLinkStyle} onClick={closeMenu}>Register</a>
        </motion.div>
        <motion.div variants={linkVariants}>
          <a href="/#schedule" style={menuLinkStyle} onClick={closeMenu}>Schedule</a>
        </motion.div>
        <motion.div variants={linkVariants}>
          <Link to="/gallery" style={menuLinkStyle} onClick={closeMenu}>Gallery</Link>
        </motion.div>
        <motion.div variants={linkVariants}>
          <Link to="/contact" style={menuLinkStyle} onClick={closeMenu}>Contact</Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default MobileMenu;