// src/components/ScheduleSection.jsx
import React, { useState, useEffect } from 'react';
import { day1Schedule, day2Schedule } from '../data/schedule.js';
import { Slide } from './Reveal.jsx';
import { motion, AnimatePresence } from 'framer-motion';
import { FaClock, FaMapMarkerAlt } from 'react-icons/fa';

function ScheduleSection() {
  const [activeDay, setActiveDay] = useState('day1');

  // 1. Add state to detect mobile view
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // --- STYLES (Most are the same) ---
  const sectionStyle = {
    padding: '6rem 2rem',
    position: 'relative',
    zIndex: 1,
    overflow: 'hidden', // Prevents any animation overflow
  };
  const tabContainerStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '3rem',
  };
  const tabStyle = {
    padding: '0.75rem 1.5rem',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#ccc',
    backgroundColor: 'transparent',
    border: '2px solid #555',
    borderRadius: '50px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  };
  const activeTabStyle = {
    color: '#121212',
    backgroundColor: '#00c1ff',
    borderColor: '#00c1ff',
  };

  // --- NEW STYLES for "Criss-Cross" Timeline ---
  
  // The main container that holds the central line
  const timelineContainerStyle = {
    maxWidth: '900px',
    margin: '0 auto',
    position: 'relative',
    padding: '2rem 0',
  };

  // The central vertical line
  const centralLineStyle = {
    position: 'absolute',
    top: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    width: '3px',
    height: '100%',
    backgroundColor: '#555',
  };
  
  // A single "row" in the timeline
  const timelineItemStyle = {
    position: 'relative', // For positioning the dot
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  };

  // The "glass" box for event content
  const eventBoxStyle = {
    width: 'calc(50% - 2.5rem)', // 50% minus gap
    background: 'rgba(30, 30, 30, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid #444',
    borderRadius: '12px',
    padding: '1.5rem',
    position: 'relative', // For the "pointer"
  };
  
  // The empty box on the other side
  const emptyBoxStyle = {
    width: 'calc(50% - 2.5rem)',
  };

  // The dot on the central line
  const timelineDotStyle = {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '21px',
    height: '21px',
    borderRadius: '50%',
    backgroundColor: '#00c1ff',
    border: '3px solid #121212',
    zIndex: 2,
  };
  
  // The "pointer" triangle on the side of the box
  const pointerStyle = {
    position: 'absolute',
    top: 'calc(50% - 10px)',
    width: 0,
    height: 0,
    borderTop: '10px solid transparent',
    borderBottom: '10px solid transparent',
  };

  // --- STYLES for Mobile Linear Timeline (Your old code) ---
  const mobileTimelineItemStyle = {
    position: 'relative',
    paddingLeft: '3rem',
    paddingBottom: '3rem',
    borderLeft: '3px solid #555',
  };
  const mobileTimelineDotStyle = {
    position: 'absolute',
    left: '-12px',
    top: '0',
    width: '21px',
    height: '21px',
    borderRadius: '50%',
    backgroundColor: '#00c1ff',
    border: '3px solid #121212',
  };

  const eventTitleStyle = {
    fontSize: '1.5rem',
    color: '#fff',
    marginBottom: '0.5rem',
  };
  const eventInfoStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    color: '#ccc',
    marginBottom: '0.25rem',
  };


  // Helper component for a single event box
  const EventCard = ({ item }) => (
    <>
      <h3 style={eventTitleStyle}>{item.event}</h3>
      <div style={eventInfoStyle}>
        <FaClock /> {item.time}
      </div>
      <div style={eventInfoStyle}>
        <FaMapMarkerAlt /> {item.venue}
      </div>
    </>
  );

  return (
    <div id="schedule" style={sectionStyle}>
      <Slide direction="up" triggerOnce>
        <h1 style={{ textAlign: 'center', marginBottom: '1rem' }}>Event Schedule</h1>
        
        {/* --- Tab Buttons (Unchanged) --- */}
        <div style={tabContainerStyle}>
          <motion.button
            style={activeDay === 'day1' ? { ...tabStyle, ...activeTabStyle } : tabStyle}
            onClick={() => setActiveDay('day1')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Day 1
          </motion.button>
          <motion.button
            style={activeDay === 'day2' ? { ...tabStyle, ...activeTabStyle } : tabStyle}
            onClick={() => setActiveDay('day2')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Day 2
          </motion.button>
        </div>

        {/* --- Animated Content Area --- */}
        <div style={{minHeight: '400px'}}>
          <AnimatePresence mode="wait">
            <motion.div
              key={activeDay}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {/* --- 2. RENDER LOGIC --- */}
              {isMobile ? (
                // --- A: MOBILE - Linear Timeline (Your old design) ---
                <div style={timelineContainerStyle}>
                  {(activeDay === 'day1' ? day1Schedule : day2Schedule).map((item, index) => (
                    <div 
                      key={index} 
                      style={
                        index === (activeDay === 'day1' ? day1Schedule : day2Schedule).length - 1
                        ? { ...mobileTimelineItemStyle, borderLeft: '3px solid #121212' }
                        : mobileTimelineItemStyle
                      }
                    >
                      <div style={mobileTimelineDotStyle}></div>
                      <EventCard item={item} />
                    </div>
                  ))}
                </div>
              ) : (
                // --- B: DESKTOP - Criss-Cross Timeline ---
                <div style={timelineContainerStyle}>
                  <div style={centralLineStyle}></div>
                  {(activeDay === 'day1' ? day1Schedule : day2Schedule).map((item, index) => (
                    <div key={index} style={timelineItemStyle}>
                      {index % 2 === 0 ? (
                        // --- Event on the LEFT ---
                        <>
                          <motion.div 
                            style={eventBoxStyle}
                            initial={{ x: -50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <EventCard item={item} />
                            <div style={{...pointerStyle, right: '-20px', borderLeft: '10px solid #444' }}></div>
                          </motion.div>
                          <div style={emptyBoxStyle}></div>
                        </>
                      ) : (
                        // --- Event on the RIGHT ---
                        <>
                          <div style={emptyBoxStyle}></div>
                          <motion.div 
                            style={eventBoxStyle}
                            initial={{ x: 50, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                          >
                            <EventCard item={item} />
                            <div style={{...pointerStyle, left: '-20px', borderRight: '10px solid #444' }}></div>
                          </motion.div>
                        </>
                      )}
                      <div style={timelineDotStyle}></div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
        
      </Slide>
    </div>
  );
}

export default ScheduleSection;