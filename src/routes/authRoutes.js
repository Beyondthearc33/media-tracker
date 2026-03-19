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

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: OAuth authentication endpoints
 */

// GET /auth/github
/**
 * @swagger
 * /auth/github:
 *   get:
 *     summary: Start GitHub OAuth login
 *     tags: [Auth]
 *     description: Redirects the user to GitHub to authenticate.
 *     responses:
 *       302:
 *         description: Redirect to GitHub OAuth login page
 */
router.get('/github', authController.login);

// GET /auth/github/callback
/**
 * @swagger
 * /auth/github/callback:
 *   get:
 *     summary: GitHub OAuth callback
 *     tags: [Auth]
 *     description: Handles the callback from GitHub after authentication.
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authentication successful
 *                 user:
 *                   type: object
 *       302:
 *         description: Redirect on auth failure
 *       401:
 *         description: Authentication failed
 */
router.get('/github/callback', authController.callback);

// GET /auth/me
/**
 * @swagger
 * /auth/me:
 *   get:
 *     summary: Get current authenticated user
 *     tags: [Auth]
 *     description: Returns the currently authenticated user from the session.
 *     responses:
 *       200:
 *         description: Authenticated user returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Authenticated user
 *                 user:
 *                   type: object
 *       401:
 *         description: User not authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User not authenticated
 */
router.get('/me', authController.getCurrentUser);

// POST /auth/logout
/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Log out current user
 *     tags: [Auth]
 *     description: Logs out the current user, destroys the session, and clears the session cookie.
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Logged out successfully
 *       500:
 *         description: Server error during logout
 */
router.post('/logout', authController.logout);

module.exports = router;
