/* ***************************
 *  routes/libraryRoutes.js
 * No validation yet
 * No middleware yet
 * Only basic Express routing
 * ************************** */
const express = require('express');
const router = express.Router();

const libraryController = require('../controllers/libraryController');

/**
 * @swagger
 * /api/library:
 *   get:
 *     summary: Get all library items
 *     tags: [Library]
 *     responses:
 *       200:
 *         description: Successfully retrieved library items
 */
router.get('/', libraryController.getAllLibraryItems);

/**
 * @swagger
 * /api/library/{id}:
 *   get:
 *     summary: Get a library item by ID
 *     tags: [Library]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Library item found
 *       404:
 *         description: Item not found
 */
router.get('/:id', libraryController.getLibraryItemById);

/**
 * @swagger
 * /api/library:
 *   post:
 *     summary: Create a new library item
 *     tags: [Library]
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
 *               rating:
 *                 type: number
 *     responses:
 *       201:
 *         description: Library item created
 */
router.post('/', libraryController.createLibraryItem);

/**
 * @swagger
 * /api/library/{id}:
 *   put:
 *     summary: Update a library item
 *     tags: [Library]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Updated successfully
 */
router.put('/:id', libraryController.updateLibraryItem);

/**
 * @swagger
 * /api/library/{id}:
 *   delete:
 *     summary: Delete a library item
 *     tags: [Library]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Deleted successfully
 */
router.delete('/:id', libraryController.deleteLibraryItem);

module.exports = router;
