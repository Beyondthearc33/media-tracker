/* ***************************
 *  server.js
 * ************************** */

// Load environment variables
require('dotenv').config();

const express = require('express');
const session = require('express-session');
const passport = require('passport');
const swaggerUi = require('swagger-ui-express');

const { connectToDatabase } = require('./db/connect');
const swaggerSpec = require('./swagger');

// Import API routes
const authRoutes = require('./routes/authRoutes');
// const mediaRoutes = require('./routes/mediaRoutes');
// const libraryRoutes = require('./routes/libraryRoutes');
// const collectionsRoutes = require('./routes/collectionsRoutes');

// Create Express application
const app = express();

// Server configuration
const PORT = process.env.PORT || 3000;

// Global middleware
app.use(express.json());

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // true only in production with HTTPS
      maxAge: 60 * 60 * 1000, // 1 hour
    },
  }),
);

/**
 * Initialize Passportok
 * passport.session() allows persistent login sessions
 */
app.use(passport.initialize());
app.use(passport.session());

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route (basic test endpoint)
app.get('/', (req, res) => {
  res.send('Media Tracker API is running');
});

// Health check endpoint
/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check API health status
 *     description: Returns the status of the API server
 *     responses:
 *       200:
 *         description: API is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 *                 service:
 *                   type: string
 *                   example: media-tracker
 */
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'media-tracker' });
});

// Routes
app.use('/api/auth', authRoutes);
// app.use('/api/media', mediaRoutes);
// app.use('/api/library', libraryRoutes);
// app.use('/api/collections', collectionsRoutes);

// Simple error handler
app.use((err, req, res, next) => {
  console.error('[server] Error:', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
});

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
