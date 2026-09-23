import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { createBooking } from '../reducers/bookingReducer';

function FlightBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const flight = location.state?.flight;
  const tripType = location.state?.tripType || 'one-way';

  const { loading, error } = useSelector((state) => state.booking);

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'Name is required';
    if (!form.email.trim()) err.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      err.email = 'Invalid email';
    }
    if (!form.phone.trim()) err.phone = 'Phone is required';
    else if (!/^\d{10}$/.test(form.phone)) {
      err.phone = 'Phone must be 10 digits';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (!flight) {
      alert('No flight selected. Please search again.');
      navigate('/flight-search');
      return;
    }

    const bookingData = {
      flightId: flight.id,
      name: form.name,
      email: form.email,
      phone: form.phone,
      tripType
    };

    const result = await dispatch(createBooking(bookingData)).unwrap();
    navigate('/confirmation', { state: { booking: result } });
  };

  if (!flight) {
    return (
      <div style={{ padding: '2rem' }}>
        No flight selected.{' '}
        <button onClick={() => navigate('/flight-search')}>Go to Search</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Flight Booking</h2>

      <div style={{ marginBottom: '1rem' }}>
        <h3>Flight Details</h3>
        <p>
          {flight.airline} - {flight.from} to {flight.to}
        </p>
        <p>Date: {flight.date}</p>
        <p>Price: ₹{flight.price}</p>
        <p>Trip Type: {tripType}</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          {errors.name && <span style={{ color: 'red' }}>{errors.name}</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Phone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
          />
          {errors.phone && <span style={{ color: 'red' }}>{errors.phone}</span>}
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default FlightBooking;
