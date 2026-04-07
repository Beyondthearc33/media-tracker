/* ***************************
 *  routes/libraryRoutes.js
 * ************************** */
const express = require('express');
const router = express.Router();

const libraryController = require('../controllers/libraryController');
const requireAuth = require('../middleware/requireAuth');

const {
  validateLibraryMiddleware,
  validateObjectId,
} = require('../validators/libraryValidator');

/**
 * @swagger
 * tags:
 *   name: Library
 *   description: User personal media library
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     LibraryItem:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 69acca80d5e6123967dabafa
 *         userId:
 *           type: string
 *           example: 69acc835d5e6123967dabaf6
 *           description: The authenticated user who owns the library item
 *         mediaId:
 *           type: string
 *           example: 69acc532d5e6123967dabaf0
 *         status:
 *           type: string
 *           enum: [watching, completed, plan_to_watch, dropped]
 *           example: completed
 *         userRating:
 *           type: number
 *           example: 5
 *         notes:
 *           type: string
 *           example: Amazing movie
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

// GET all library items
/**
 * @swagger
 * /api/library:
 *   get:
 *     summary: Get all library items for the user
 *     tags: [Library]
 *     description: Returns all items in the user's library. Authentication required.
 *     responses:
 *       200:
 *         description: Library items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LibraryItem'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get(
    '/', 
    requireAuth, 
    libraryController.getAllLibraryItems
);

// GET a single library item by ID
/**
 * @swagger
 * /api/library/{id}:
 *   get:
 *     summary: Get a library item by ID
 *     tags: [Library]
 *     description: Returns a specific library item. Authentication required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Library item ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Library item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LibraryItem'
 *       400:
 *         description: Invalid library item id
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Library item not found
 *       500:
 *         description: Server error
 */
router.get(
  '/:id',
  requireAuth,
  validateObjectId('id'),
  libraryController.getLibraryItemById
);

// POST a new library item
/**
 * @swagger
 * /api/library:
 *   post:
 *     summary: Add a media item to the authenticated user's library
 *     tags: [Library]
 *     description: Creates a library item for the logged-in user. The userId is assigned automatically by the server.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - mediaId
 *             properties:
 *               mediaId:
 *                 type: string
 *                 example: 69acc532d5e6123967dabaf0
 *               status:
 *                 type: string
 *                 enum: [watching, completed, plan_to_watch, dropped]
 *                 example: completed
 *               userRating:
 *                 type: number
 *                 example: 5
 *               notes:
 *                 type: string
 *                 example: Amazing movie
 *     responses:
 *       201:
 *         description: Library item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LibraryItem'
 *       400:
 *         description: Invalid input or duplicate entry (media already exists in library)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
  '/',
  requireAuth,
  validateLibraryMiddleware(false),
  libraryController.createLibraryItem
);

// PUT update a library item by ID
/**
 * @swagger
 * /api/library/{id}:
 *   put:
 *     summary: Update one or more fields of a library item
 *     tags: [Library]
 *     description: Partially updates a library item only if it belongs to the logged-in user. The userId cannot be changed by the client.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Library item ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mediaId:
 *                 type: string
 *                 example: 69acc532d5e6123967dabaf0
 *               status:
 *                 type: string
 *                 enum: [watching, completed, plan_to_watch, dropped]
 *                 example: watching
 *               userRating:
 *                 type: number
 *                 example: 4
 *               notes:
 *                 type: string
 *                 example: Updated notes
 *     responses:
 *       200:
 *         description: Library item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LibraryItem'
 *       400:
 *         description: Invalid library item id, invalid input, or duplicate entry
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Library item not found
 *       500:
 *         description: Server error
 */
router.put(
  '/:id',
  requireAuth,
  validateObjectId('id'),
  validateLibraryMiddleware(true),
  libraryController.updateLibraryItem
);

// DELETE a library item by ID
/**
 * @swagger
 * /api/library/{id}:
 *   delete:
 *     summary: Delete a library item
 *     tags: [Library]
 *     description: Removes a library item only if it belongs to the logged-in user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Library item ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Library item deleted successfully
 *       400:
 *         description: Invalid library item id
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Library item not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/:id',
  requireAuth,
  validateObjectId('id'),
  libraryController.deleteLibraryItem
);

module.exports = router;
