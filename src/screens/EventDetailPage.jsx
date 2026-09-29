// src/pages/EventDetailPage.jsx
import React from 'react';
import { useParams, Link } from '@tanstack/react-router';
import { eventData } from '../data/events.js';
import { motion } from 'framer-motion';
import RegisterButton from '../components/RegisterButton.jsx';

import { 
  FaUserShield, FaUserGraduate, FaStar, FaTrophy, 
  FaClipboardList, FaGavel, FaTools, FaUsers, 
  FaBrain, FaComments, FaListOl 
} from 'react-icons/fa';

function EventDetailPage() {
  const { eventSlug } = useParams({ strict: false });
  const event = eventData.find(e => e.slug === eventSlug);

  // --- STYLES ---
  const pageStyle = { padding: '0 0 4rem 0', minHeight: '100vh' };
  const bannerStyle = { height: '60vh', width: '100%', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem', color: '#fff', overflow: 'hidden' };
  const bannerImageStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 1 };
  const bannerOverlayStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(180deg, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)', zIndex: 2 };
  const bannerContentStyle = { position: 'relative', zIndex: 3, maxWidth: '1200px', margin: '0 auto', width: '100%', textAlign: 'center' };
  const contentContainerStyle = { maxWidth: '1200px', margin: '3rem auto 0 auto', padding: '0 2rem' };
  
  const detailsGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '2rem',
    marginTop: '2rem',
  };
  
  const sectionBoxStyle = { 
    background: 'rgba(30, 30, 30, 0.7)', 
    backdropFilter: 'blur(10px)', 
    border: '1px solid #444', 
    borderRadius: '12px', 
    padding: '2rem', 
    height: '100%',
    display: 'flex',
    flexDirection: 'column'
  };
  
  const listStyle = { listStyleType: 'none', paddingLeft: 0, lineHeight: 1.8, color: '#ccc' };
  const titleStyle = { fontSize: '1.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' };
  
  // Specific grid for disciplines/topics
  const subGridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
    gap: '1.5rem',
    marginTop: '2rem',
  };

  // --- Handle Event Not Found ---
  if (!event) {
    return (
      <div style={{...pageStyle, paddingTop: '8rem', textAlign: 'center'}}>
        <h1>Event Not Found</h1>
        <Link to="/events" style={{ textAlign: 'center', display: 'block' }}>
          Back to all events
        </Link>
      </div>
    );
  }

  // --- RENDER FUNCTION ---
  return (
    <div style={pageStyle}>
      {/* --- 1. BANNER --- */}
      <motion.div style={bannerStyle} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
        <img src={event.image} alt={event.title} style={bannerImageStyle} />
        <div style={bannerOverlayStyle}></div>
        <div style={bannerContentStyle}>
          <span style={{ background: '#444', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.9rem' }}>
            {event.category}
          </span>
          <h1 style={{ fontSize: '4rem', textTransform: 'uppercase', margin: '0.5rem 0 0 0' }}>
            {event.title}
          </h1>
        </div>
      </motion.div>

      {/* --- 2. CONTENT AREA --- */}
      <div style={contentContainerStyle}>
        
        {/* --- About Section --- */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
          <h2 style={{ fontSize: '2rem', color: '#00c1ff' }}>About this Event</h2>
          <p style={{ fontSize: '1.1rem', color: '#ccc', lineHeight: 1.7, marginTop: '1rem' }}>
            {event.description}
          </p>
        </motion.div>

        {/* --- 3. FLEXIBLE DETAILS GRID --- */}
        <motion.div 
          style={detailsGridStyle} 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {/* Box: Key Features */}
          {event.keyFeatures && (
            <div style={sectionBoxStyle}>
              <h3 style={titleStyle}><FaStar />Key Features</h3>
              <ul style={listStyle}>
                {event.keyFeatures.map((feature, i) => (
                  <li key={i} style={{marginBottom: '0.5rem'}}><strong>{feature.title}:</strong> {feature.text}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Box: Rules */}
          {event.rules && (
            <div style={sectionBoxStyle}>
              <h3 style={titleStyle}><FaGavel />Rules</h3>
              <ul style={{...listStyle, listStyleType: 'disc', paddingLeft: '1.2rem'}}>
                {event.rules.map((rule, i) => <li key={i}>{rule}</li>)}
              </ul>
            </div>
          )}

          {/* Box: Event Structure */}
          {event.eventStructure && (
            <div style={sectionBoxStyle}>
              <h3 style={titleStyle}><FaTools />Event Structure</h3>
              <ul style={listStyle}>
                {event.eventStructure.map((item, i) => (
                  <li key={i} style={{marginBottom: '0.5rem'}}><strong>{item.title}:</strong> {item.text}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Box: Judging Criteria */}
          {event.judgingCriteria && (
            <div style={sectionBoxStyle}>
              <h3 style={titleStyle}><FaClipboardList />Judging Criteria</h3>
              <ul style={listStyle}>
                {event.judgingCriteria.map((item, i) => (
                  <li key={i} style={{marginBottom: '0.5rem'}}>
                    {item.percent ? (
                      <><strong>{item.title}:</strong> {item.percent}</>
                    ) : (
                      <>{item.text || item.title}</>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Box: Coordinators */}
          {event.coordinators && (
            <div style={sectionBoxStyle}>
              <h3 style={titleStyle}><FaUsers />Coordinators</h3>
              {event.coordinators.faculty.length > 0 && (
                <>
                  <h4 style={{color: '#fff'}}>Faculty</h4>
                  <ul style={{...listStyle, listStyleType: 'disc', paddingLeft: '1.2rem'}}>
                    {event.coordinators.faculty.map((name, i) => <li key={i}>{name}</li>)}
                  </ul>
                </>
              )}
              {event.coordinators.student.length > 0 && (
                <>
                  <h4 style={{color: '#fff', marginTop: '1rem'}}>Student</h4>
                  <ul style={{...listStyle, listStyleType: 'disc', paddingLeft: '1.2rem'}}>
                    {event.coordinators.student.map((name, i) => <li key={i}>{name}</li>)}
                  </ul>
                </>
              )}
            </div>
          )}

          {/* Box: Prizes & Registration */}
          {event.prizes && (
            <div style={sectionBoxStyle}>
              <h3 style={titleStyle}><FaTrophy />Prizes & Registration</h3>
              <p style={{ color: '#ccc' }}><strong>Winner:</strong> {event.prizes.first}</p>
              <p style={{ color: '#ccc', marginTop: '0.5rem' }}><strong>Runner-up:</strong> {event.prizes.second}</p>
              <div style={{ marginTop: 'auto', paddingTop: '1.5rem', textAlign: 'center' }}>
                <RegisterButton href={event.registrationLink || 'https://Techkriti2.vercel.app/'} />
              </div>
            </div>
          )}
        </motion.div>

        {/* --- 4. SPECIAL SECTIONS --- */}

        {/* --- Section: Disciplines (for Tech Exhibition) --- */}
        {event.disciplines && (
          <motion.div style={{marginTop: '3rem'}} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <h2 style={{ fontSize: '2rem', color: '#00c1ff', textAlign: 'center' }}>Featured Demonstrations by Discipline</h2>
            <div style={subGridStyle}>
              {event.disciplines.map((d, i) => (
                <div key={i} style={sectionBoxStyle}>
                  <h3 style={{...titleStyle, color: '#fff'}}>{d.name}</h3>
                  <ul style={{...listStyle, listStyleType: 'disc', paddingLeft: '1.2rem'}}>
                    {d.items.map((item, j) => <li key={j}>{item}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- Section: Segments (for Memory Master) --- */}
        {event.segments && (
          <motion.div style={{marginTop: '3rem'}} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <h2 style={{ fontSize: '2rem', color: '#00c1ff', textAlign: 'center' }}>Event Segments</h2>
            <div style={subGridStyle}>
              {event.segments.map((seg, i) => (
                <div key={i} style={sectionBoxStyle}>
                  <h3 style={{...titleStyle, color: '#fff'}}><FaBrain />{seg.title}</h3>
                  <p style={{color: '#ccc', marginBottom: '1rem'}}>{seg.description}</p>
                  <ul style={listStyle}>
                    {seg.rounds.map((round, j) => (
                      <li key={j} style={{marginBottom: '0.5rem'}}><strong>{round.title}:</strong> {round.text}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* --- Section: Suggested Topics (for Debate) --- */}
        {event.suggestedTopics && (
          <motion.div style={{marginTop: '3rem'}} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }}>
            <h2 style={{ fontSize: '2rem', color: '#00c1ff', textAlign: 'center' }}>Suggested Topics</h2>
            <div style={subGridStyle}>
              <div style={sectionBoxStyle}>
                <h3 style={{...titleStyle, color: '#fff'}}><FaComments />Technical Topics</h3>
                <ul style={{...listStyle, listStyleType: 'disc', paddingLeft: '1.2rem'}}>
                  {event.suggestedTopics.technical.map((topic, i) => <li key={i}>{topic}</li>)}
                </ul>
              </div>
              <div style={sectionBoxStyle}>
                <h3 style={{...titleStyle, color: '#fff'}}><FaComments />Non-Technical Topics</h3>
                <ul style={{...listStyle, listStyleType: 'disc', paddingLeft: '1.2rem'}}>
                  {event.suggestedTopics.nonTechnical.map((topic, i) => <li key={i}>{topic}</li>)}
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {/* --- Back Link --- */}
        <Link to="/events" style={{ marginTop: '3rem', color: '#ccc', display: 'inline-block' }}>
          &larr; Back to all events
        </Link>
      </div>
    </div>
  );
}

export default EventDetailPage;