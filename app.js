const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

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

// Middleware
app.use(express.json());

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Contacts API',
      version: '1.0.0',
      description: 'A simple Contacts API',
    },
    servers: [
      {
        url: 'https://contacts-api-kxh6.onrender.com',
        description: 'Production server'
      },
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
  },
  apis: ['./routes/*.js'], // Path to your API routes
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// Swagger Documentation Route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Make our app understand JSON
app.use(express.json());

// Routes
app.use('/contacts', require('./routes/contacts'));

// Simple test route
app.get('/', (req, res) => {
  res.json({ 
    message: 'Contacts API is working! 🎉',
    endpoints: {
      docs: '/api-docs',
      contacts: '/contacts',
      health: '/health'
    }
  });
});

app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK ✅',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Tell our app to listen for visitors
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`API Docs: http://localhost:${PORT}/api-docs`);
});