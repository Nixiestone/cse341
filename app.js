const express = require('express');

// ONLY load .env in development, NOT in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
  console.log('Development mode: Loading .env file');
} else {
  console.log('Production mode: Using Render environment variables');
}

const connectDB = require('./config/database');

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