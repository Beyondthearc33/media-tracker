/* ***************************
 *  routes/mediaRoutes.js
 * No validation yet
 * No middleware yet
 * Only basic Express routing
 * ************************** */
const express = require('express');
const router = express.Router();

const mediaController = require('../controllers/mediaController');

/**
 * @swagger
 * /api/media:
 *   get:
 *     summary: Get all media items
 *     tags: [Media]
 *     responses:
 *       200:
 *         description: Successfully retrieved media items
 */
router.get('/', mediaController.getAllMedia);

/**
 * @swagger
 * /api/media/{id}:
 *   get:
 *     summary: Get a media item by ID
 *     tags: [Media]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Media item found
 *       404:
 *         description: Media not found
 */
router.get('/:id', mediaController.getMediaById);

/**
 * @swagger
 * /api/media:
 *   post:
 *     summary: Create a new media item
 *     tags: [Media]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Media item created
 */
router.post('/', mediaController.createMedia);

/**
 * @swagger
 * /api/media/{id}:
 *   put:
 *     summary: Update a media item
 *     tags: [Media]
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
router.put('/:id', mediaController.updateMedia);

/**
 * @swagger
 * /api/media/{id}:
 *   delete:
 *     summary: Delete a media item
 *     tags: [Media]
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
router.delete('/:id', mediaController.deleteMedia);

module.exports = router;
