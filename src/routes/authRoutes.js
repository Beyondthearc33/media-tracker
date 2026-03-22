/* ***************************
 *  routes/libraryRoutes.js
 * No validation yet
 * No middleware yet
 * Only basic Express routing
 * ************************** */
const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

/**
 * @swagger
 * /api/auth/login:
 *   get:
 *     summary: Start OAuth login process
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Redirect to OAuth provider
 */
router.get('/login', authController.login);

/**
 * @swagger
 * /api/auth/callback:
 *   get:
 *     summary: OAuth callback handler
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User authenticated
 */
router.get('/callback', authController.callback);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Current user info
 */
router.get('/me', authController.getCurrentUser);

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Log out current user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logged out successfully
 */
router.post('/logout', authController.logout);

module.exports = router;
