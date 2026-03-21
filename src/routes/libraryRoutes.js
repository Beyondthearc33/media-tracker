/* ***************************
 *  routes/libraryRoutes.js
 * No validation yet
 * No Swagger comments yet
 * ************************** */
const express = require('express');
const router = express.Router();

const libraryController = require('../controllers/libraryController');

const requireAuth = require('../middleware/requireAuth');

// GET all library items
router.get('/', requireAuth, libraryController.getAllLibraryItems);

// GET a single library item by ID
router.get('/:id', requireAuth, libraryController.getLibraryItemById);

// POST a new library item
router.post('/', requireAuth, libraryController.createLibraryItem);

// PUT update a library item by ID
router.put('/:id', requireAuth, libraryController.updateLibraryItem);

// DELETE a library item by ID
router.delete('/:id', requireAuth, libraryController.deleteLibraryItem);

module.exports = router;
