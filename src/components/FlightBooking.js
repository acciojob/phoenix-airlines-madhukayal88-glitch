import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setBooking } from '../redux/actions';

function FlightBooking() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const flight = useSelector(state => state.flight);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});

  if (!flight) {
    navigate('/flight-search');
    return null;
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    else if (formData.name.trim().length < 2) newErrors.name = 'Name must be at least 2 characters';
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Phone number must be 10 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch(setBooking({
        passenger: formData,
        flight: flight
      }));
      navigate('/confirmation');
    }
  };

  return (
    <div className="flight-booking">
      <h2>📝 Flight Booking</h2>
      
      <div className="booking-summary">
        <h3>Flight Details</h3>
        <p><strong>Route:</strong> {flight.source} → {flight.destination}</p>
        <p><strong>Time:</strong> {flight.time}</p>
        <p><strong>Price:</strong> {flight.price}</p>
        <p><strong>Type:</strong> {flight.tripType}</p>
        <p><strong>Date:</strong> {flight.date}</p>
        {flight.returnDate && <p><strong>Return Date:</strong> {flight.returnDate}</p>}
      </div>

      <form onSubmit={handleSubmit} className="booking-form">
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className={`form-input ${errors.name ? 'error' : ''}`}
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`form-input ${errors.email ? 'error' : ''}`}
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Phone</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Enter 10-digit phone number"
            className={`form-input ${errors.phone ? 'error' : ''}`}
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <button type="submit" className="btn btn-success">
          Confirm Booking ✈️
        </button>
      </form>
    </div>
  );
}

export default FlightBooking;
