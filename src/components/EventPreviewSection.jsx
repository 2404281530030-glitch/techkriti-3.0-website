// src/components/EventPreviewSection.jsx
import React from 'react';
import { Link } from '@tanstack/react-router';
import { eventData } from '../data/events.js';
import EventCard from './EventCard.jsx';
import { Slide, Fade } from './Reveal.jsx';

function EventPreviewSection() {
  const sectionStyle = {
    padding: '3rem 2rem',
    textAlign: 'center',
    position: 'relative',
    zIndex: 1,
    // backgroundColor: '#121212', // Back to the main background
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginTop: '1rem',
    maxWidth: '1400px',
    margin: '2rem auto 0 auto',
  };

  return (
    <div style={sectionStyle}>
      <Slide direction="up" triggerOnce>
        <h1>Flagship Events</h1>
    <p style={{ marginBottom: '0.5rem' }}>A glimpse into the challenges that await.</p>
        
        <div style={gridStyle}>
          {/* We'll just show the first 6 as a "preview" */}
          {eventData.slice(0, 6).map((event, index) => (
            <Fade key={event.id} direction="up" delay={index * 100} triggerOnce>
              <EventCard event={event} />
            </Fade>
          ))}
        </div>
        
        {/* Add a button to see all events */}
        <Link to="/events" style={{
          display: 'inline-block',
          marginTop: '2rem',
          padding: '0.85rem 1.75rem',
          border: '1px solid #00c1ff',
          color: '#00c1ff',
          borderRadius: '50px',
          textDecoration: 'none',
          fontSize: '1.05rem',
          fontWeight: 'bold'
        }}>
          View All Events
        </Link>
      </Slide>
    </div>
  );
}

export default EventPreviewSection;