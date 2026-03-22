/* ***************************
 *  server.js
 * ************************** */

// Load environment variables
require('dotenv').config();

const express = require('express');

// Database connection
const { connectToDatabase } = require('./db/connect');

// Create Express application
const app = express();

// Import API routes
const authRoutes = require('./routes/authRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const collectionsRoutes = require('./routes/collectionsRoutes');

// Global middleware
app.use(express.json());

// Root route (basic test endpoint)
app.get('/', (req, res) => {
  res.send('Media Tracker API is running');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'media-tracker' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/collections', collectionsRoutes);

// Swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Media Tracker API',
      version: '1.0.0',
      description: 'API for tracking movies and TV shows'
    }
  },
  apis: ['./src/routes/*.js'], // where your routes are
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Server configuration
const PORT = process.env.PORT || 3000;

// Start the server after DB check
async function startServer() {
  try {
    await connectToDatabase();
    console.log('[server] MongoDB connection verified');

    app.listen(PORT, () => {
      console.log(`[server] Server running on ${PORT}`);
    });
  } catch (error) {
    console.error('[server] Failed to start server because MongoDB connection failed:');
    console.error(error);
    process.exit(1);
  }
}

startServer();
