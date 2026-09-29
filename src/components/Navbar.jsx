// src/components/Navbar.jsx

// 1. Import React Hooks and Framer Motion
import React, { useState, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { motion, AnimatePresence } from 'framer-motion'; // Import AnimatePresence
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons
import MobileMenu from './MobileMenu'; // Import the new component

function Navbar() {
  // --- STATE ---
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state for mobile menu

  // --- EFFECTS ---

  // Effect for scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Effect for mobile detection
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= 768);
    onResize(); // Check on initial load
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Effect to lock scrolling when menu is open
  useEffect(() => {
    if (isMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isMenuOpen, isMobile]);

  // --- STYLES ---

  // Animation variants for the nav
  const navVariants = {
    top: {
      backgroundColor: 'rgba(26, 26, 26, 0.0)',
      backdropFilter: 'blur(0px)',
      borderBottom: '1px solid rgba(51, 51, 51, 0.0)',
    },
    scrolled: {
      backgroundColor: 'rgba(26, 26, 26, 0.7)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(51, 51, 51, 1.0)',
    },
  };

  // Animation variants for desktop links
  const linkItemVariants = {
    hover: {
      y: -3,
      color: '#00c1ff',
      transition: { type: 'spring', stiffness: 300 }
    },
    tap: {
      scale: 0.95
    }
  };
  
  // Base style for desktop links
  const linkStyle = {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '1.1rem'
  };

  // Style for the hamburger icon
  const hamburgerIconStyle = {
    fontSize: '1.5rem',
    color: '#fff',
    cursor: 'pointer',
    zIndex: 50, // Ensure it's above the backdrop
  };

  return (
    <>
      <motion.nav
        style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            zIndex: 50, // Needs to be high
            display: 'flex',
            gap: isMobile ? '0.75rem' : '1rem',
            padding: isMobile ? '0.75rem 1rem' : '1.5rem 2rem',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        variants={navVariants}
        animate={isScrolled ? 'scrolled' : 'top'}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
      >
        {/* Logo image */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} aria-label="Techkriti Home">
          <img src="/logo.png" alt="Techकृति 2.O" style={{ height: isMobile ? '3rem' : '5rem', width: 'auto' }} />
        </Link>
        
        {/* --- NAVIGATION: This is the main change --- */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center' }}>
          {isMobile ? (
            // --- MOBILE VIEW: Hamburger Icon ---
            <motion.div
              style={hamburgerIconStyle}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
              key={isMenuOpen ? 'times' : 'bars'} // Add key for enter/exit animation
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.2 }}
            >
              {isMenuOpen ? <FaTimes /> : <FaBars />}
            </motion.div>
          ) : (
            // --- DESKTOP VIEW: Inline Links ---
            <div 
              className="nav-links" 
              style={{ 
                display: 'flex', 
                gap: '2rem', 
                alignItems: 'center', 
                flexWrap: 'wrap',
                flexGrow: 1,
                justifyContent: 'flex-end',
              }}
            >
              <motion.div variants={linkItemVariants} whileHover="hover" whileTap="tap">
                <Link to="/" style={linkStyle}>Home</Link>
              </motion.div>
              <motion.div variants={linkItemVariants} whileHover="hover" whileTap="tap">
                <Link to="/events" style={linkStyle}>Events</Link>
              </motion.div>
              <motion.div variants={linkItemVariants} whileHover="hover" whileTap="tap">
                <a href="https://Techkriti2.vercel.app/" target="_blank" rel="noopener noreferrer" style={linkStyle}>Register</a>
              </motion.div>
              <motion.div variants={linkItemVariants} whileHover="hover" whileTap="tap">
                <a href="/#schedule" style={linkStyle}>Schedule</a>
              </motion.div>
              <motion.div variants={linkItemVariants} whileHover="hover" whileTap="tap">
              <Link to="/gallery" style={linkStyle}>Gallery</Link>
            </motion.div>
              <motion.div variants={linkItemVariants} whileHover="hover" whileTap="tap">
                <Link to="/contact" style={linkStyle}>Contact</Link>
              </motion.div>
            </div>
          )}
        </div>
      </motion.nav>

      {/* --- RENDER THE MOBILE MENU --- */}
      <AnimatePresence>
        {isMobile && isMenuOpen && (
          <MobileMenu closeMenu={() => setIsMenuOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;