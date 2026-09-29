// src/components/HeroSection.jsx
import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

function HeroSection() {

  // --- Styles ---
  // Responsive: we'll adjust height for small screens
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const heroStyle = {
    height: isMobile ? '70vh' : '100vh', // Full screen height on desktop, shorter on mobile
    width: '100%',
    position: 'relative', // For positioning children
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden', // Hides video overflow
    textAlign: 'center',
    color: '#fff',
  };

  const videoStyle = {
    position: 'relative',
    top: 0,
    left: '50%',
    width: '100vw',
    height: '100%',
    minHeight: '100%',
    // objectFit: 'cover', // Covers the whole area
    transform: 'translateX(-50%)',
    zIndex: 1, // Behind content
    pointerEvents: 'none', // Prevent accidental interaction on mobile
  };

  // const overlayStyle = {
  //   position: 'absolute',
  //   top: 0,
  //   left: 0,
  //   width: '100%',
  //   height: '100%',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay
  //   zIndex: 2, // Above video, below text
  // };

  const contentStyle = {
    position: 'relative',
    zIndex: 3, // On top of everything
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const headingStyle = {
    fontSize: isMobile ? '2rem' : '5rem', // smaller on mobile
    fontWeight: 'bold',
    marginBottom: '1rem',
    background: 'linear-gradient(90deg, #00c1ff, #e000ff)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  };

  const pStyle = {
    fontSize: isMobile ? '1rem' : '1.5rem',
    color: '#eee',
    maxWidth: '600px',
  };

  const scrollIconStyle = {
    position: 'absolute',
    bottom: isMobile ? '20px' : '40px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 3,
    color: '#fff',
    width: '200px',
    textAlign: 'center',
  };

  const chevronStyle = {
    width: isMobile ? '18px' : '24px',
    height: isMobile ? '18px' : '24px',
  };

  // ref for the background video so we can control playback
  const videoRef = useRef(null);

  return (
    <div className="hero" style={heroStyle}>
      {/* 1. The Video Background */}
      <video
        ref={videoRef}
        style={videoStyle}
        src="/hero-video.mp4" // Pulls from your 'public' folder
        autoPlay
        muted
        playsInline // Important for mobile
        onEnded={() => {
          // Ensure the video stops on the last frame after playing once
          const v = videoRef.current;
          if (v) {
            v.pause();
            v.currentTime = v.duration;
          }
        }}
      />
      {/* 2. The Dark Overlay */}
      {/* <div style={overlayStyle}></div> */}

      {/* 3. The Animated Content */}
      <div style={contentStyle}>
        {/* <motion.h1
          style={headingStyle}
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Welcome to Techकृति 2.O
        </motion.h1> */}
        
        {/* <motion.p
          style={pStyle}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          The annual technical festival of Kashi Institute of Technology, Varanasi.
        </motion.p> */}
      </div>

      {/* 4. The Animated Scroll Icon */}
      <motion.div
        style={scrollIconStyle}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }} // Bouncing animation
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          {/* A simple SVG Chevron Icon */}
          <svg style={chevronStyle} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
          <div style={{fontSize: '0.8rem'}}>Scroll Down To Dive Into The World Of TECHकृति</div>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default HeroSection; 