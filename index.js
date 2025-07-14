const express = require('express');
const sequelize = require('./config/db');
const User = require('./models/user');
const Bus = require('./models/bus');
const Booking = require('./models/booking');
const Payment = require('./models/payment');

const app = express();
app.use(express.json());

// Sync DB
sequelize.sync().then(() => {
  console.log('✅ Database synced');
});

// Sample Insert Routes

// POST /users
app.post('/users', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET /users
app.get('/users', async (req, res) => {
  const users = await User.findAll();
  res.json(users);
});

// POST /buses
app.post('/buses', async (req, res) => {
  try {
    const bus = await Bus.create(req.body);
    res.status(201).json(bus);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// GET /buses/available/:seats
app.get('/buses/available/:seats', async (req, res) => {
  const buses = await Bus.findAll({
    where: {
      availableSeats: {
        [require('sequelize').Op.gt]: req.params.seats
      }
    }
  });
  res.json(buses);
});

app.listen(3000, () => {
  console.log('🚀 Server running on http://localhost:3000');
});
