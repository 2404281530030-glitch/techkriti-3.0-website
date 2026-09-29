
import React, { useState, useEffect } from 'react';

function CountdownTimer() {

  const festStartDate = "2025-12-05T09:00:00";
  // ----------------------------------------------------

  const calculateTimeLeft = () => {
    const difference = +new Date(festStartDate) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      };
    } else {
      timeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    // This timer will update every second
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    // This "clears" the timer when the component is removed
    return () => clearInterval(timer);
  }, []);

  // --- Styling ---
  const timerWrapperStyle = {
    display: 'flex',
    gap: '0 rem',
    justifyContent: 'center',
    marginTop: '2rem'
    
  };

  const timeUnitStyle = {
    background: '#2a2a2a',
    padding: '1rem 1.5rem',
    borderRadius: '8px',
    border: '1px solid #444',
    textAlign: 'center',
    minWidth: '90px'
  };

  const numberStyle = {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#00c1ff'
  };

  const labelStyle = {
    fontSize: '0.9rem',
    color: '#aaa',
    marginTop: '0.25rem'
  };

  return (
    <div style={timerWrapperStyle}>
      <div style={timeUnitStyle}>
        <div style={numberStyle}>{String(timeLeft.days).padStart(2, '0')}</div>
        <div style={labelStyle}>Days</div>
      </div>
      <div style={timeUnitStyle}>
        <div style={numberStyle}>{String(timeLeft.hours).padStart(2, '0')}</div>
        <div style={labelStyle}>Hours</div>
      </div>
      <div style={timeUnitStyle}>
        <div style={numberStyle}>{String(timeLeft.minutes).padStart(2, '0')}</div>
        <div style={labelStyle}>Minutes</div>
      </div>
      <div style={timeUnitStyle}>
        <div style={numberStyle}>{String(timeLeft.seconds).padStart(2, '0')}</div>
        <div style={labelStyle}>Seconds</div>
      </div>
    </div>
  );
}

export default CountdownTimer;