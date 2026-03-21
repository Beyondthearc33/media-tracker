/* ***************************
 *  routes/collectionsRoutes.js
 * No validation yet
 * No Swagger comments yet
 * ************************** */
const express = require('express');
const router = express.Router();

const collectionsController = require('../controllers/collectionsController');

const requireAuth = require('../middleware/requireAuth');

// GET all collections
router.get('/', requireAuth, collectionsController.getAllCollections);

// GET collection by id
router.get('/:id', requireAuth, collectionsController.getCollectionById);

// POST create a new collection
router.post('/', requireAuth, collectionsController.createCollection);

// PUT update a collection by id
router.put('/:id', requireAuth, collectionsController.updateCollection);

// DELETE a collection by id
router.delete('/:id', requireAuth, collectionsController.deleteCollection);

// POST add an item to a collection
router.post('/:id/items', requireAuth, collectionsController.addItemToCollection);

// DELETE remove an item from a collection
router.delete(
  '/:id/items/:mediaId',
  requireAuth,
  collectionsController.removeItemFromCollection,
);

module.exports = router;
