// src/components/Footer.jsx
import React from 'react';
import { Link } from '@tanstack/react-router';
// 1. Import all the icons we need
import { FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaYoutube, FaFacebook } from 'react-icons/fa';

function Footer() {
  // --- STYLES ---

  const footerStyle = {
    // backgroundColor: '#1a1a1a',
    color: '#aaa',
    padding: '4rem 2rem',
    borderTop: '1px solid #333',
    position: 'relative',
    zIndex: 1,
    textAlign: 'center',
  };

  // The new grid container
  const gridStyle = {
    display: 'grid',
    // This creates 4 responsive columns
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2.5rem',
    maxWidth: '1400px',
    margin: '0 auto',
  };

  // Style for each column
  const columnStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    alignItems: 'center',
  };

  // Style for column titles (e.g., "QUICK LINKS")
  const titleStyle = {
    color: '#00c1ff', // Our accent color
    fontSize: '1.1rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem',
    textTransform: 'uppercase',
  };
  
  // Style for simple text links
  const linkStyle = {
    color: '#aaa',
    textDecoration: 'none',
    transition: 'color 0.3s ease',
  };

  // Style for social icons
  const socialIconsStyle = {
    display: 'flex',
    gap: '1.5rem',
    fontSize: '1.5rem',
  };

  const iconStyle = {
    color: '#aaa',
    transition: 'all 0.3s ease',
  };

  // Style for contact items (icon + text)
  const contactItemStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
  };

  // --- Hover Handlers (for a cleaner look) ---
  const handleLinkHover = (e) => (e.currentTarget.style.color = '#fff');
  const handleLinkLeave = (e) => (e.currentTarget.style.color = '#aaa');
  const handleIconHover = (e, color) => {
    e.currentTarget.style.color = color;
    e.currentTarget.style.transform = 'scale(1.1)';
  };
  const handleIconLeave = (e) => {
    e.currentTarget.style.color = '#aaa';
    e.currentTarget.style.transform = 'scale(1)';
  };

  // --- COMPONENT ---
  return (
    <footer style={footerStyle}>
      <div style={gridStyle}>
        
        {/* --- Column 1: About --- */}
        <div style={columnStyle}>
          <h3 style={{...titleStyle, color: '#fff', fontSize: '1.5rem', textTransform: 'none'}}>
            Techकृति 2.O
          </h3>
          <p style={{lineHeight: 1.6}}>
            The annual technical extravaganza of Kashi Institute of Technology. 
            A two-day celebration of innovation, technology, and creativity.
          </p>
          <div style={{fontSize: '0.9rem', marginTop: '1rem'}}>
            © {new Date().getFullYear()} Techकृति |                    All Rights Reserved.
          </div>
        </div>

        {/* --- Column 2: Quick Links --- */}
        <div style={columnStyle}>
          <h3 style={titleStyle}>Quick Links</h3>
          <Link to="/" style={linkStyle} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave}>Home</Link>
          <Link to="/events" style={linkStyle} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave}>Events</Link>
          <a href="https://Techkriti2.vercel.app/" style={linkStyle} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave} target="_blank" rel="noopener noreferrer">Register</a>
          <Link to="/contact" style={linkStyle} onMouseEnter={handleLinkHover} onMouseLeave={handleLinkLeave}>Contact Us</Link>
        </div>

        {/* --- Column 3: Contact Us --- */}
        <div style={columnStyle}>
          <h3 style={titleStyle}>Contact Us</h3>
          <div style={contactItemStyle}>
            <FaEnvelope /> <span>techkriti2025@gmail.com</span>
          </div>
          <div style={contactItemStyle}>
            <FaPhone /> <span>+91 9839570621</span>
          </div>
          <div style={contactItemStyle}>
            <FaMapMarkerAlt /> 
            <span>Kashi Institute of Technology,Mirzamurad , Varanasi, UP</span>
          </div>
        </div>

        {/* --- Column 4: Follow Us --- */}
        <div style={columnStyle}>
          <h3 style={titleStyle}>Follow Us</h3>
          <div style={socialIconsStyle}>
            <a href="https://www.instagram.com/tech_kriti.kashi?igsh=MXFocmFlaDdqemx5Mw==" style={iconStyle} onMouseEnter={(e) => handleIconHover(e, '#e000ff')} onMouseLeave={handleIconLeave} aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://www.linkedin.com/company/techkriti-kashi/" style={iconStyle} onMouseEnter={(e) => handleIconHover(e, '#00c1ff')} onMouseLeave={handleIconLeave} aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;