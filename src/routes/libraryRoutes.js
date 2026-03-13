/* ***************************
 *  routes/libraryRoutes.js
 * No validation yet
 * No middleware yet
 * No Swagger comments yet
 * Only basic Express routing
 * ************************** */
const express = require('express');
const router = express.Router();

const libraryController = require('../controllers/libraryController');

// GET all library items
router.get('/', libraryController.getAllLibraryItems);

// GET a single library item by ID
router.get('/:id', libraryController.getLibraryItemById);

// POST a new library item
router.post('/', libraryController.createLibraryItem);

// PUT update a library item by ID
router.put('/:id', libraryController.updateLibraryItem);

// DELETE a library item by ID
router.delete('/:id', libraryController.deleteLibraryItem);

module.exports = router;