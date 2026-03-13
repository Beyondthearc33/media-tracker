/* ***************************
 *  routes/collectionsRoutes.js
 * No validation yet
 * No middleware yet
 * No Swagger comments yet
 * Only basic Express routing
 * ************************** */
const express = require('express');
const router = express.Router();

const collectionsController = require('../controllers/collectionsController');

// GET all collections
router.get('/', collectionsController.getAllCollections);

// GET collection by id
router.get('/:id', collectionsController.getCollectionById);

// POST create a new collection
router.post('/', collectionsController.createCollection);

// PUT update a collection
router.put('/:id', collectionsController.updateCollection);

// DELETE a collection
router.delete('/:id', collectionsController.deleteCollection);

// POST add an item to a collection
router.post('/:id/items', collectionsController.addItemToCollection);

// DELETE remove an item from a collection
router.delete('/:id/items/:mediaId', collectionsController.removeItemFromCollection);

module.exports = router;
