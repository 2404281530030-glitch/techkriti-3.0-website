// src/components/EventCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from '@tanstack/react-router'; // 1. Import Link

function EventCard({ event }) {
  const cardStyle = {
    border: '1px solid #444',
    borderRadius: '8px',
    padding: '1.5rem',
    backgroundColor: '#2a2a2a',
    maxWidth: '350px',
  textAlign: 'center',
    cursor: 'pointer',
    // We add 'overflow: hidden' to contain the image on hover
    overflow: 'hidden', 
  };

  const imgStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '1rem',
    transition: 'transform 0.3s ease-in-out', // Smooth image zoom
  };

  const cardVariants = {
    hidden: { scale: 1 },
    hover: {
      scale: 1.0, // We'll let the link wrapper handle scaling now
    }
  };

  // New wrapper style for the link
  const linkWrapperStyle = {
    textDecoration: 'none',
    color: 'inherit', // Inherits the white color
    display: 'block'
  };

  // We'll move the scale animation to the Link wrapper
  const linkVariants = {
    hover: {
      scale: 1.05,
      transition: { type: 'spring', stiffness: 300, damping: 15 }
    }
  };
  
  // Custom hover effect for the image
  const imgHoverStyle = (e) => (e.currentTarget.style.transform = 'scale(1.1)');
  const imgLeaveStyle = (e) => (e.currentTarget.style.transform = 'scale(1)');

  return (
    // 2. Wrap everything in a motion.div (as a Link)
    <motion.div
      variants={linkVariants}
      whileHover="hover"
    >
      <Link to={`/events/${event.slug}`} style={linkWrapperStyle}>
        {/* 3. The card itself no longer needs motion props */}
        <div 
          style={cardStyle}
          // We apply the image zoom here
          onMouseEnter={e => imgHoverStyle(e.currentTarget.querySelector('img'))}
          onMouseLeave={e => imgLeaveStyle(e.currentTarget.querySelector('img'))}
        >
          <div style={{ overflow: 'hidden', borderRadius: '4px' }}> {/* Container to clip image zoom */}
            <img src={event.image} alt={event.title} style={imgStyle} />
          </div>
          <h3 style={{ margin: '1rem 0 0.5rem 0', color: '#00c1ff' }}>{event.title}</h3>
                  <span style={{ background: '#444', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.8rem', display: 'inline-block' }}>
            {event.category}
          </span>
          <p style={{ marginTop: '1rem', lineHeight: '1.5' }}>{event.description}</p>
        </div>
      </Link>
    </motion.div>
  );
}

export default EventCard;