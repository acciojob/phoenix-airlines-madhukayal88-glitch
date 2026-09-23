import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchFlights } from '../reducers/flightReducer';

function FlightSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, loading, error } = useSelector((state) => state.flights);

  const [form, setForm] = useState({
    tripType: 'one-way',
    from: '',
    to: '',
    date: '',
    returnDate: ''
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const err = {};
    if (!form.from) err.from = 'Source is required';
    if (!form.to) err.to = 'Destination is required';
    if (!form.date) err.date = 'Date is required';
    if (form.tripType === 'round-trip' && !form.returnDate) {
      err.returnDate = 'Return date is required';
    }
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    dispatch(searchFlights(form));
  };

  const handleBook = (flight) => {
    navigate('/flight-booking', {
      state: { flight, tripType: form.tripType }
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Flight Search</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              type="radio"
              name="tripType"
              value="one-way"
              checked={form.tripType === 'one-way'}
              onChange={(e) => setForm({ ...form, tripType: e.target.value })}
            />{' '}
            One-way
          </label>
          <label style={{ marginLeft: '1rem' }}>
            <input
              type="radio"
              name="tripType"
              value="round-trip"
              checked={form.tripType === 'round-trip'}
              onChange={(e) => setForm({ ...form, tripType: e.target.value })}
            />{' '}
            Round-trip
          </label>
        </div>

        <div>
          <input
            type="text"
            placeholder="Source"
            value={form.from}
            onChange={(e) => setForm({ ...form, from: e.target.value })}
          />
          {errors.from && <span style={{ color: 'red' }}>{errors.from}</span>}
        </div>

        <div>
          <input
            type="text"
            placeholder="Destination"
            value={form.to}
            onChange={(e) => setForm({ ...form, to: e.target.value })}
          />
          {errors.to && <span style={{ color: 'red' }}>{errors.to}</span>}
        </div>

        <div>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
          {errors.date && <span style={{ color: 'red' }}>{errors.date}</span>}
        </div>

        {form.tripType === 'round-trip' && (
          <div>
            <input
              type="date"
              value={form.returnDate}
              onChange={(e) => setForm({ ...form, returnDate: e.target.value })}
            />
            {errors.returnDate && (
              <span style={{ color: 'red' }}>{errors.returnDate}</span>
            )}
          </div>
        )}

        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {list.length > 0 && (
        <div>
          <h3>Search Results</h3>
          {list.map((flight) => (
            <div
              key={flight.id}
              style={{
                border: '1px solid #ccc',
                margin: '1rem 0',
                padding: '1rem',
                borderRadius: '6px'
              }}
            >
              <p>{flight.airline}</p>
              <p>
                {flight.from} → {flight.to}
              </p>
              <p>Date: {flight.date}</p>
              <p>Price: ₹{flight.price}</p>
              <button className="book-flight" onClick={() => handleBook(flight)}>
                Book Flight
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FlightSearch;
