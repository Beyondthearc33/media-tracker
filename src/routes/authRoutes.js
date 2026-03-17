/* ***************************
 *  routes/libraryRoutes.js
 * No validation yet
 * No middleware yet
 * No Swagger comments yet
 * Only basic Express routing
 * ************************** */
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// GET /auth/github
// Redirects the user to GitHub/Google login using OAuth
router.get('/github', authController.login);

// GET /auth/github/callback
// GitHub redirects the user to this endpoint after authentication
router.get('/github/callback', authController.callback);

// GET /auth/me
// Returns the currently authenticated user's information
router.get('/me', authController.getCurrentUser);

// POST /auth/logout
// Logs out the currently authenticated user
router.post('/logout', authController.logout);

module.exports = router;
