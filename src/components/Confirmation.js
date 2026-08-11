import React from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Confirmation() {
  const booking = useSelector(state => state.booking);
  const navigate = useNavigate();

  if (!booking) {
    navigate('/');
    return null;
  }

  const { passenger, flight } = booking;

  return (
    <div className="confirmation">
      <div className="confirmation-card">
        <div className="success-icon">✅</div>
        <h2>Booking Confirmed!</h2>
        <p>Your flight has been successfully booked.</p>

        <div className="booking-details">
          <h3>Passenger Details</h3>
          <p><strong>Name:</strong> {passenger.name}</p>
          <p><strong>Email:</strong> {passenger.email}</p>
          <p><strong>Phone:</strong> {passenger.phone}</p>

          <h3>Flight Details</h3>
          <p><strong>Route:</strong> {flight.source} → {flight.destination}</p>
          <p><strong>Time:</strong> {flight.time}</p>
          <p><strong>Price:</strong> {flight.price}</p>
          <p><strong>Type:</strong> {flight.tripType}</p>
          <p><strong>Date:</strong> {flight.date}</p>
          {flight.returnDate && <p><strong>Return Date:</strong> {flight.returnDate}</p>}
        </div>

        <div className="confirmation-actions">
          <button className="btn btn-primary" onClick={() => navigate('/')}>
            Go to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default Confirmation;
