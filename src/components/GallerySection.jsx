// src/components/GallerySection.jsx
import React from 'react';
import { galleryImages } from '../data/gallery.js';
import { motion } from 'framer-motion';
import { Slide } from './Reveal.jsx';
import { Link } from '@tanstack/react-router'; // 1. Import Link

function GallerySection() {
  const sectionStyle = {
    padding: '6rem 2rem',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '1rem',
    marginTop: '2rem',
  };

  const imgContainerStyle = {
    overflow: 'hidden',
    borderRadius: '8px',
  };

  const imgStyle = {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    borderRadius: '8px',
  };

  return (
    <div style={sectionStyle}>
      <Slide direction="up" triggerOnce>
        <h1>Glimpses of the Past</h1>
        <p>Memories from the previous edition of Techकृति.</p>
        
        <div style={gridStyle}>
          {/* 2. Use .slice(0, 6) to show only the first 6 images */}
          {galleryImages.slice(0, 6).map((image) => (
            <motion.div
              key={image.id}
              style={imgContainerStyle}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <img src={image.src} alt={`Gallery ${image.id}`} style={imgStyle} />
            </motion.div>
          ))}
        </div>
        
        {/* 3. Add a "View All" button */}
        <Link to="/gallery" style={{
          display: 'inline-block',
          marginTop: '3rem',
          padding: '1rem 2rem',
          border: '1px solid #00c1ff',
          color: '#00c1ff',
          borderRadius: '50px',
          textDecoration: 'none',
          fontSize: '1.1rem',
          fontWeight: 'bold'
        }}>
          View Full Gallery
        </Link>
      </Slide>
    </div>
  );
}

export default GallerySection;