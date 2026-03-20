/* ***************************
 *  server.js
 * ************************** */

// Load environment variables
require('dotenv').config();

const express = require('express');

// Sessions + Auth
const session = require('express-session');
const passport = require('passport');

const swaggerUi = require('swagger-ui-express');

const { connectToDatabase } = require('./db/connect');
const swaggerSpec = require('./swagger');

// Load Passport configuration
require('./config/passport');

// Import API routes
const authRoutes = require('./routes/authRoutes');
// const mediaRoutes = require('./routes/mediaRoutes');
// const libraryRoutes = require('./routes/libraryRoutes');
// const collectionsRoutes = require('./routes/collectionsRoutes');

// Import middleware
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

// Create Express application
const app = express();

// Server configuration
const PORT = process.env.PORT || 3000;

// Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 1000,
    },
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Swagger API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Root route
app.get('/', (req, res) => {
  res.send('Media Tracker API is running');
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'media-tracker' });
});

// API Routes
app.use('/api/auth', authRoutes);
// app.use('/api/media', mediaRoutes);
// app.use('/api/library', libraryRoutes);
// app.use('/api/collections', collectionsRoutes);

// 404 handler 
app.use(notFound);

// Global error handler 
app.use(errorHandler);

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