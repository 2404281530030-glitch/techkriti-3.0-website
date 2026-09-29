// src/pages/GalleryPage.jsx
import React from 'react';
import { galleryImages } from '../data/gallery.js';
import { motion } from 'framer-motion';

function GalleryPage() {
  const pageStyle = {
    padding: '8rem 2rem 4rem 2rem', // Padding for fixed navbar
    minHeight: '100vh',
  };

  const titleStyle = {
    textAlign: 'center',
    fontSize: '3rem',
    color: '#00c1ff',
    marginBottom: '1rem',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem',
    maxWidth: '1600px',
    margin: '2rem auto 0 auto',
  };

  const imgContainerStyle = {
    overflow: 'hidden',
    borderRadius: '8px',
  };

  const imgStyle = {
    width: '100%',
    height: '300px',
    objectFit: 'cover',
    borderRadius: '8px',
  };

  return (
    <div style={pageStyle}>
      <h1 style={titleStyle}>Gallery</h1>
      <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#ccc' }}>
        Memories from past editions of Techकृति.
      </p>
      
      <motion.div 
        style={gridStyle}
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.05 } }
        }}
      >
        {/* We map over ALL images here, no slice */}
        {galleryImages.map((image) => (
          <motion.div
            key={image.id}
            style={imgContainerStyle}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
            whileHover={{ scale: 1.05, zIndex: 10 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <img src={image.src} alt={`Gallery ${image.id}`} style={imgStyle} />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default GalleryPage;