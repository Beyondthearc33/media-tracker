/* ***************************
 *  routes/mediaRoutes.js
 * No validation yet
 * No middleware yet
 * No Swagger comments yet
 * Only basic Express routing
 * ************************** */
const express = require('express');
const router = express.Router();

const mediaController = require('../controllers/mediaController');

// GET all media
router.get('/', mediaController.getAllMedia);

// GET a single media item by ID
router.get('/:id', mediaController.getMediaById);

// POST create a new media item
router.post('/', mediaController.createMedia);

// PUT update a media item by ID
router.put('/:id', mediaController.updateMedia);

// DELETE a media item by ID
router.delete('/:id', mediaController.deleteMedia);

module.exports = router;
