import React from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

function Confirmation() {
  const navigate = useNavigate();
  const location = useLocation();

  const bookingFromState = location.state?.booking;
  const bookingFromStore = useSelector((state) => state.booking.current);
  const booking = bookingFromState || bookingFromStore;

  if (!booking) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <h2>No booking found</h2>
        <button onClick={() => navigate('/')}>Return to Home</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h2>Booking Confirmed!</h2>
      <p>Booking ID: {booking.id}</p>
      <p>Name: {booking.name}</p>
      <p>Email: {booking.email}</p>
      <p>Phone: {booking.phone}</p>
      <p>Flight: {booking.flight.airline}</p>
      <p>
        Route: {booking.flight.from} → {booking.flight.to}
      </p>
      <p>Date: {booking.flight.date}</p>
      <p>Status: {booking.status}</p>

      <button onClick={() => navigate('/')}>Return to Home</button>
    </div>
  );
}

export default Confirmation;
