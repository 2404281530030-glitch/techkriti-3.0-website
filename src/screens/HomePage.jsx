import React from 'react';
import { Slide } from "../components/Reveal.jsx";

import HeroSection from '../components/HeroSection.jsx';
import CountdownTimer from '../components/CountdownTimer.jsx';
import RegisterButton from '../components/RegisterButton.jsx';
import AboutSection from '../components/AboutSection.jsx';
import EventPreviewSection from '../components/EventPreviewSection.jsx';
import GallerySection from '../components/GallerySection.jsx';
import ScheduleSection from '../components/ScheduleSection.jsx';

function HomePage() {


  const mainContentStyle = {
    padding: '3rem 2rem 2rem 2rem',
    textAlign: 'center',
    
    position: 'relative',
    zIndex: 1,
  };

  const timerTitleStyle = {
    fontSize: '1rem',
    color: '#aaa',
    marginBottom: '-0.5rem'
  };

  return (
    <div>
     
      <HeroSection />

      {/* Section 2: The Countdown Timer & Register Button */}
      <div style={mainContentStyle}>
        <Slide direction="up" triggerOnce>
          <h2 style={timerTitleStyle}>Fest Begins In:</h2>
          <CountdownTimer />
          <div style={{marginTop: '1rem'}}>
            <RegisterButton />
          </div>
        </Slide>
      </div>
      
      
      <AboutSection />

      
      <EventPreviewSection />

      <ScheduleSection /> 

     
      <GallerySection />
      
      
    </div>
  );
}

export default HomePage;