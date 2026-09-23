import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Phoenix Airlines</h1>
      <p>Book your flights easily.</p>
      <Link to="/flight-search">
        <button>Search Flights</button>
      </Link>
    </div>
  );
}

export default LandingPage;
