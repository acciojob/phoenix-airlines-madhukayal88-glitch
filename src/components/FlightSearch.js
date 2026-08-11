import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setFlight } from '../redux/actions';

function FlightSearch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [tripType, setTripType] = useState('one-way');
  const [source, setSource] = useState('');
  const [destination, setDestination] = useState('');
  const [date, setDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [error, setError] = useState('');

  const flights = [
    { id: 1, source: 'New York', destination: 'Los Angeles', price: '$299', time: '8:00 AM' },
    { id: 2, source: 'New York', destination: 'London', price: '$599', time: '10:30 AM' },
    { id: 3, source: 'New York', destination: 'Dubai', price: '$699', time: '2:00 PM' },
    { id: 4, source: 'Los Angeles', destination: 'Tokyo', price: '$799', time: '11:00 AM' },
    { id: 5, source: 'Los Angeles', destination: 'London', price: '$499', time: '6:00 PM' },
    { id: 6, source: 'Los Angeles', destination: 'New York', price: '$299', time: '9:00 AM' },
    { id: 7, source: 'Chicago', destination: 'Miami', price: '$199', time: '7:00 AM' },
    { id: 8, source: 'Chicago', destination: 'Las Vegas', price: '$249', time: '4:00 PM' },
  ];

  const [searchResults, setSearchResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');
    
    if (!source || !destination || !date) {
      setError('Please fill in all required fields');
      return;
    }

    if (source === destination) {
      setError('Source and destination cannot be the same');
      return;
    }

    const results = flights.filter(
      f => f.source.toLowerCase() === source.toLowerCase() && 
           f.destination.toLowerCase() === destination.toLowerCase()
    );

    setSearchResults(results);
    setHasSearched(true);
  };

  const handleBookFlight = (flight) => {
    dispatch(setFlight({
      ...flight,
      tripType,
      date,
      returnDate: tripType === 'round-trip' ? returnDate : null
    }));
    navigate('/flight-booking');
  };

  return (
    <div className="flight-search">
      <h2>🔍 Flight Search</h2>
      
      <form onSubmit={handleSearch} className="search-form">
        <div className="trip-type">
          <label>
            <input
              type="radio"
              value="one-way"
              checked={tripType === 'one-way'}
              onChange={() => setTripType('one-way')}
            />
            One-Way
          </label>
          <label>
            <input
              type="radio"
              value="round-trip"
              checked={tripType === 'round-trip'}
              onChange={() => setTripType('round-trip')}
            />
            Round-Trip
          </label>
        </div>

        <div className="form-row">
          <input
            type="text"
            placeholder="Source City"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className="form-input"
          />
          <input
            type="text"
            placeholder="Destination City"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-row">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="form-input"
          />
          {tripType === 'round-trip' && (
            <input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="form-input"
              placeholder="Return Date"
            />
          )}
        </div>

        {error && <div className="error">{error}</div>}

        <button type="submit" className="btn btn-primary">Search Flights</button>
      </form>

      {hasSearched && (
        <div className="search-results">
          <h3>Available Flights</h3>
          {searchResults.length === 0 ? (
            <p className="no-results">No flights found for this route</p>
          ) : (
            searchResults.map((flight) => (
              <div key={flight.id} className="flight-card">
                <div className="flight-info">
                  <div className="flight-route">
                    <span className="source">{flight.source}</span>
                    <span className="arrow">→</span>
                    <span className="destination">{flight.destination}</span>
                  </div>
                  <div className="flight-details">
                    <span>🕐 {flight.time}</span>
                    <span className="price">{flight.price}</span>
                  </div>
                </div>
                <button 
                  className="book-flight btn btn-success"
                  onClick={() => handleBookFlight(flight)}
                >
                  Book Now
                </button>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export default FlightSearch;
