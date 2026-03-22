/* ***************************
 *  routes/collectionsRoutes.js
 * No validation yet
 * No middleware yet
 * Only basic Express routing
 * ************************** */
const express = require('express');
const router = express.Router();

const collectionsController = require('../controllers/collectionsController');

/**
 * @swagger
 * /api/collections:
 *   get:
 *     summary: Get all collections
 *     tags: [Collections]
 *     responses:
 *       200:
 *         description: Successfully retrieved collections
 */
router.get('/', collectionsController.getAllCollections);

/**
 * @swagger
 * /api/collections/{id}:
 *   get:
 *     summary: Get a collection by ID
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Collection found
 */
router.get('/:id', collectionsController.getCollectionById);
/**
 * @swagger
 * /api/collections:
 *   post:
 *     summary: Create a new collection
 *     tags: [Collections]
 *     responses:
 *       201:
 *         description: Collection created
 */
router.post('/', collectionsController.createCollection);

/**
 * @swagger
 * /api/collections/{id}:
 *   put:
 *     summary: Update a collection
 *     tags: [Collections]
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
router.put('/:id', collectionsController.updateCollection);

/**
 * @swagger
 * /api/collections/{id}:
 *   delete:
 *     summary: Delete a collection
 *     tags: [Collections]
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
router.delete('/:id', collectionsController.deleteCollection);

/**
 * @swagger
 * /api/collections/{id}/items:
 *   post:
 *     summary: Add a media item to a collection
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Item added to collection
 */
router.post('/:id/items', collectionsController.addItemToCollection);

/**
 * @swagger
 * /api/collections/{id}/items/{mediaId}:
 *   delete:
 *     summary: Remove a media item from a collection
 *     tags: [Collections]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: mediaId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Item removed from collection
 */
router.delete('/:id/items/:mediaId', collectionsController.removeItemFromCollection);

module.exports = router;
