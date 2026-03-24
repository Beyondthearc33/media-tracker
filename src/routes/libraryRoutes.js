/* ***************************
 *  routes/libraryRoutes.js
 * No validation yet
 * ************************** */
const express = require('express');
const router = express.Router();

const libraryController = require('../controllers/libraryController');

const requireAuth = require('../middleware/requireAuth');

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
 *         mediaId:
 *           type: string
 *           example: 69acc532d5e6123967dabaf0
 *         status:
 *           type: string
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
router.get('/', requireAuth, libraryController.getAllLibraryItems);

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
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Library item not found
 *       500:
 *         description: Server error
 */
router.get('/:id', requireAuth, libraryController.getLibraryItemById);

// POST a new library item
/**
 * @swagger
 * /api/library:
 *   post:
 *     summary: Add a media item to library
 *     tags: [Library]
 *     description: Adds a media item to the user's library. Authentication required.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               mediaId:
 *                 type: string
 *               status:
 *                 type: string
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
 *         description: Duplicate entry (media already in library)
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post('/', requireAuth, libraryController.createLibraryItem);

// PUT update a library item by ID
/**
 * @swagger
 * /api/library/{id}:
 *   put:
 *     summary: Update a library item
 *     tags: [Library]
 *     description: Updates an existing library item. Authentication required.
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
 *               status:
 *                 type: string
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
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Library item not found
 *       500:
 *         description: Server error
 */
router.put('/:id', requireAuth, libraryController.updateLibraryItem);

// DELETE a library item by ID
/**
 * @swagger
 * /api/library/{id}:
 *   delete:
 *     summary: Delete a library item
 *     tags: [Library]
 *     description: Removes a media item from the user's library. Authentication required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Library item ID
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Library item deleted successfully (no content)
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Library item not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', requireAuth, libraryController.deleteLibraryItem);

module.exports = router;
