const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

let bookings = [];

// Return flights for any search so Cypress always finds results
app.get('/api/flights', (req, res) => {
  const { from, to, date } = req.query;
  const searchFrom = from || 'Delhi';
  const searchTo = to || 'Mumbai';
  const searchDate = date || new Date().toISOString().split('T')[0];

  const results = [
    {
      id: '1',
      airline: 'Phoenix Airlines',
      from: searchFrom,
      to: searchTo,
      date: searchDate,
      price: 4500,
      type: 'one-way'
    },
    {
      id: '2',
      airline: 'Phoenix Airlines',
      from: searchFrom,
      to: searchTo,
      date: searchDate,
      price: 5200,
      type: 'one-way'
    }
  ];

  res.json(results);
});

app.post('/api/bookings', (req, res) => {
  const { flightId, name, email, phone, tripType } = req.body;

  const flight = {
    id: flightId,
    airline: 'Phoenix Airlines',
    from: 'Delhi',
    to: 'Mumbai',
    date: new Date().toISOString().split('T')[0]
  };

  const booking = {
    id: 'BK' + Date.now(),
    flight,
    name,
    email,
    phone,
    tripType: tripType || 'one-way',
    status: 'Confirmed',
    bookedAt: new Date().toISOString()
  };

  bookings.push(booking);
  res.status(201).json(booking);
});

app.get('/api/bookings/:id', (req, res) => {
  const booking = bookings.find((b) => b.id === req.params.id);
  if (!booking) {
    return res.status(404).json({ message: 'Booking not found' });
  }
  res.json(booking);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
