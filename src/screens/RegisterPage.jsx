// src/pages/RegisterPage.jsx
import React from 'react';

function RegisterPage() {
  const pageStyle = {
    // 👇 Change this line
    padding: '8rem 2rem 2rem 2rem', // Pushes content below the Navbar
    textAlign: 'center'
  };

  return (
    // 👇 Add the style
    <div style={pageStyle}>
      <h1>Register Now!</h1>
      <p>Click here to register for the fest.</p>
    </div>
  );
}

export default RegisterPage;