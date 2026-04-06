/* ***************************
 *  routes/collectionsRoutes.js
 * ************************** */
const express = require('express');
const router = express.Router();

const collectionsController = require('../controllers/collectionsController');
const requireAuth = require('../middleware/requireAuth');

const {
  validateCollectionMiddleware,
  validateObjectId,
  validateMediaIdBody,
} = require('../validators/collectionsValidator');

/**
 * @swagger
 * tags:
 *   name: Collections
 *   description: User-created media collections owned by the authenticated user
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Collection:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 69acd12bd5e6123967dabb05
 *         userId:
 *           type: string
 *           example: 69acc835d5e6123967dabaf6
 *         name:
 *           type: string
 *           example: My Favorite Movies
 *         description:
 *           type: string
 *           example: A curated list of my top cinema picks.
 *         mediaIds:
 *           type: array
 *           items:
 *             type: string
 *           example: [69acc532d5e6123967dabaf0, 69acc350d5e6123967dababf]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/collections:
 *   get:
 *     summary: Get all collections for the logged-in user
 *     tags: [Collections]
 *     description: Returns only the collections that belong to the authenticated user.
 *     responses:
 *       200:
 *         description: Collections retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Collection'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.get(
  '/', 
  requireAuth, 
  collectionsController.getAllCollections
);

/**
 * @swagger
 * /api/collections/{id}:
 *   get:
 *     summary: Get one collection by ID
 *     tags: [Collections]
 *     description: Returns one collection that belongs to the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Collection ID
 *         schema:
 *           type: string
 *           example: 69acd12bd5e6123967dabb05
 *     responses:
 *       200:
 *         description: Collection retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       400:
 *         description: Invalid collection id
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Collection not found
 *       500:
 *         description: Server error
 */
router.get(
  '/:id',
  requireAuth,
  validateObjectId('id'),
  collectionsController.getCollectionById
);

/**
 * @swagger
 * /api/collections:
 *   post:
 *     summary: Create a new collection
 *     tags: [Collections]
 *     description: Creates a new collection for the authenticated user. The owner is taken from the logged-in user, not from the request body.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: My Favorite Movies
 *               description:
 *                 type: string
 *                 example: A curated list of my top cinema picks.
 *               mediaIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [69acc532d5e6123967dabaf0]
 *     responses:
 *       201:
 *         description: Collection created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Server error
 */
router.post(
  '/', 
  requireAuth, 
  validateCollectionMiddleware(false), 
  collectionsController.createCollection
);

/**
 * @swagger
 * /api/collections/{id}:
 *   put:
 *     summary: Update a collection
 *     tags: [Collections]
 *     description: Updates a collection that belongs to the authenticated user. Supports updating provided fields only. The collection owner cannot be changed.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Collection ID
 *         schema:
 *           type: string
 *           example: 69acd12bd5e6123967dabb05
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Favorites
 *               description:
 *                 type: string
 *                 example: Updated description for this collection.
 *               mediaIds:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [69acc532d5e6123967dabaf0, 69acc350d5e6123967dababf]
 *     responses:
 *       200:
 *         description: Collection updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       400:
 *         description: Invalid collection id
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Collection not found
 *       500:
 *         description: Server error
 */
router.put(
  '/:id',
  requireAuth,
  validateObjectId('id'),
  validateCollectionMiddleware(true),
  collectionsController.updateCollection
);

/**
 * @swagger
 * /api/collections/{id}:
 *   delete:
 *     summary: Delete a collection
 *     tags: [Collections]
 *     description: Deletes a collection that belongs to the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Collection ID
 *         schema:
 *           type: string
 *           example: 69acd12bd5e6123967dabb05
 *     responses:
 *       200:
 *         description: Collection deleted successfully
 *       400:
 *         description: Invalid collection id
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Collection not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/:id', 
  requireAuth, 
  collectionsController.deleteCollection
);

/**
 * @swagger
 * /api/collections/{id}/items:
 *   post:
 *     summary: Add a media item to a collection
 *     tags: [Collections]
 *     description: Adds a media ID to the collection's mediaIds array only if the collection belongs to the authenticated user. Duplicate media IDs are prevented.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Collection ID
 *         schema:
 *           type: string
 *           example: 69acd12bd5e6123967dabb05
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mediaId:
 *                 type: string
 *                 example: 69acc532d5e6123967dabaf0
 *     responses:
 *       200:
 *         description: Media item added to collection successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       400:
 *         description: Invalid collection id, mediaId is required, or invalid media id
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Collection not found
 *       500:
 *         description: Server error
 */
router.post(
  '/:id/items',
  requireAuth,
  validateObjectId('id'),
  validateMediaIdBody,
  collectionsController.addItemToCollection
);

/**
 * @swagger
 * /api/collections/{id}/items/{mediaId}:
 *   delete:
 *     summary: Remove a media item from a collection
 *     tags: [Collections]
 *     description: Removes a media ID from the collection's mediaIds array only if the collection belongs to the authenticated user.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Collection ID
 *         schema:
 *           type: string
 *           example: 69acd12bd5e6123967dabb05
 *       - in: path
 *         name: mediaId
 *         required: true
 *         description: Media ID to remove
 *         schema:
 *           type: string
 *           example: 69acc532d5e6123967dabaf0
 *     responses:
 *       200:
 *         description: Media item removed from collection successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Collection'
 *       400:
 *         description: Invalid collection id or invalid media id
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Collection not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/:id/items/:mediaId',
  requireAuth,
  validateObjectId('id'),
  validateObjectId('mediaId'),
  collectionsController.removeItemFromCollection
);

module.exports = router;
