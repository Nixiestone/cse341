const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Make our app understand JSON
app.use(express.json());

// Routes
app.use('/contacts', require('./routes/contacts'));

// Simple test route
app.get('/', (req, res) => {
  res.json({ message: 'Hello from Contacts API!' });
});

// Tell our app to listen for visitors
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});