import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import FlightSearch from './components/FlightSearch';
import FlightBooking from './components/FlightBooking';
import Confirmation from './components/Confirmation';
import './styles.css';

function App() {
  return (
    <div className="app">
      <nav className="navbar">
        <div className="nav-brand">✈️ Phoenix Airlines</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/flight-search">Search Flights</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/flight-search" element={<FlightSearch />} />
        <Route path="/flight-booking" element={<FlightBooking />} />
        <Route path="/confirmation" element={<Confirmation />} />
      </Routes>
    </div>
  );
}

export default App;
