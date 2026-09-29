// src/pages/EventsPage.jsx
import React from 'react';
import { eventData } from '../data/events.js';
import EventCard from '../components/EventCard.jsx';
// import { Fade } from "./Reveal.jsx"; // <-- 1. REMOVE this import

function EventsPage() {
  // ... (pageStyle is the same)
  const pageStyle = {
    padding: '8rem 2rem 2rem 2rem',
    textAlign: 'center'
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginTop: '2rem'
  };

  return (
    <div style={pageStyle}>
      <h1>Events & Workshops</h1>
      <p>Explore all the technical and non-technical events planned for Techकृति 2.O.</p>
      
      <div style={gridStyle}>
        {eventData.map(event => (
          // 2. REMOVE the <Fade> wrapper
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default EventsPage;