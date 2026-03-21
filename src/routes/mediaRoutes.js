/* ***************************
 *  routes/mediaRoutes.js
 *  Public routes for shared media catalog
 *  Protected write routes with requireAuth
 *  No validation yet
 *  No Swagger comments yet
 * ************************** */
const express = require('express');
const router = express.Router();

const mediaController = require('../controllers/mediaController');

const requireAuth = require('../middleware/requireAuth');

// GET all media
router.get('/', mediaController.getAllMedia);

// GET a single media item by ID
router.get('/:id', mediaController.getMediaById);

// POST create a new media item
router.post('/', requireAuth, mediaController.createMedia);

// PUT update a media item by ID
router.put('/:id', requireAuth, mediaController.updateMedia);

// DELETE a media item by ID
router.delete('/:id', requireAuth, mediaController.deleteMedia);

module.exports = router;
