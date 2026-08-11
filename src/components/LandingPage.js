import React from 'react';
import { Link } from 'react-router-dom';

function LandingPage() {
  return (
    <div className="landing-page">
      <div className="hero">
        <h1>✈️ Welcome to Phoenix Airlines</h1>
        <p>Book your dream destination with ease and comfort</p>
        <Link to="/flight-search" className="btn btn-primary">
          Book Now
        </Link>
      </div>

      <div className="features">
        <div className="feature">
          <span>🛫</span>
          <h3>One-Way Flights</h3>
          <p>Book your one-way journey to any destination</p>
        </div>
        <div className="feature">
          <span>🔄</span>
          <h3>Round-Trip</h3>
          <p>Plan your round trip with flexible dates</p>
        </div>
        <div className="feature">
          <span>💺</span>
          <h3>Best Seats</h3>
          <p>Choose your preferred seats</p>
        </div>
        <div className="feature">
          <span>🛡️</span>
          <h3>Secure Booking</h3>
          <p>Safe and secure payment process</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
