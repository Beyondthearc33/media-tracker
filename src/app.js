/* ***************************
 *  app.js
 * ************************** */

// Load environment variables
require('dotenv').config();

const express = require('express');

// Sessions + Auth
const session = require('express-session');
const passport = require('passport');
const MongoStore = require('connect-mongo');

// Swagger UI
const swaggerUi = require('swagger-ui-express');

// Swagger config
const swaggerSpec = require('./swagger');

// Load Passport strategy configuration
require('./config/passport');

// Import route files
const authRoutes = require('./routes/authRoutes');
const mediaRoutes = require('./routes/mediaRoutes');
const libraryRoutes = require('./routes/libraryRoutes');
const collectionsRoutes = require('./routes/collectionsRoutes');

// Import middleware
const notFound = require('./middleware/notFound');
const errorHandler = require('./middleware/errorHandler');

// Create the Express application
const app = express();

/* -------------------------
 * Global middleware
 * ------------------------- */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('trust proxy', 1);

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_URI,
      collectionName: 'sessions',
    }),

    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // keep dynamic
      sameSite: 'lax',
      maxAge: 2 * 60 * 60 * 1000, // ✅ 2 HOURS
    },
  }),
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Basic test routes
app.get('/', (req, res) => {
  res.send('Media Tracker API is running');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'media-tracker' });
});

/* -------------------------
 * API routes
 * ------------------------- */
app.use('/api/auth', authRoutes);
app.use('/api/media', mediaRoutes);
app.use('/api/library', libraryRoutes);
app.use('/api/collections', collectionsRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;
