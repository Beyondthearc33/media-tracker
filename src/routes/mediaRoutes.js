/* ***************************
 *  routes/mediaRoutes.js
 *  Public routes for shared media catalog
 *  Protected write routes with requireAuth
 * ************************** */
const express = require('express');
const router = express.Router();

const mediaController = require('../controllers/mediaController');

const requireAuth = require('../middleware/requireAuth');

const {
  validateMediaMiddleware,
  validateObjectId,
} = require('../validators/mediaValidator');

/**
 * @swagger
 * tags:
 *   name: Media
 *   description: Endpoints for the shared media catalog
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Media:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 69acc350d5e6123967dababf
 *         title:
 *           type: string
 *           example: Game of Thrones
 *         type:
 *           type: string
 *           example: tv
 *         releaseYear:
 *           type: integer
 *           example: 2011
 *         seasons:
 *           type: integer
 *           example: 8
 *         duration:
 *           type: integer
 *           example: 96
 *         genre:
 *           type: array
 *           items:
 *             type: string
 *           example: [fantasy, drama, adventure]
 *         director:
 *           type: array
 *           items:
 *             type: string
 *           example: [David Benioff, D. B. Weiss]
 *         mpaRating:
 *           type: string
 *           example: tv-ma
 *         description:
 *           type: string
 *           example: Nine noble families fight for control over the lands of Westeros.
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

// GET all media
/**
 * @swagger
 * /api/media:
 *   get:
 *     summary: Get all media items
 *     tags: [Media]
 *     description: Returns all media items in the shared media catalog.
 *     responses:
 *       200:
 *         description: Media items retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Media'
 *       500:
 *         description: Server error
 */
router.get(
    '/', 
    mediaController.getAllMedia
);

// GET a single media item by ID
/**
 * @swagger
 * /api/media/{id}:
 *   get:
 *     summary: Get a media item by ID
 *     tags: [Media]
 *     description: Returns one media item from the shared media catalog.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the media item
 *         schema:
 *           type: string
 *           example: 69acc350d5e6123967dababf
 *     responses:
 *       200:
 *         description: Media item retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Media'
 *       404:
 *         description: Media item not found
 *       500:
 *         description: Server error
 */
router.get(
  '/:id',
  validateObjectId('id'),
  mediaController.getMediaById
);

// POST create a new media item
/**
 * @swagger
 * /api/media:
 *   post:
 *     summary: Create a new media item
 *     tags: [Media]
 *     description: Creates a new movie or TV show in the shared media catalog. Authentication required.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Up
 *               type:
 *                 type: string
 *                 example: movie
 *               releaseYear:
 *                 type: integer
 *                 example: 2009
 *               duration:
 *                 type: integer
 *                 example: 96
 *               seasons:
 *                 type: integer
 *                 example: 8
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [animation, adventure]
 *               director:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [Pete Docter]
 *               mpaRating:
 *                 type: string
 *                 example: pg
 *               description:
 *                 type: string
 *                 example: A 78-year-old Carl Fredricksen travels to Paradise Falls in his house equipped with balloons.
 *     responses:
 *       201:
 *         description: Media item created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Media'
 *       401:
 *         description: Unauthorized
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post(
  '/',
  requireAuth,
  validateMediaMiddleware(false),
  mediaController.createMedia
);

// PUT update a media item by ID
/**
 * @swagger
 * /api/media/{id}:
 *   put:
 *     summary: Update a media item by ID
 *     tags: [Media]
 *     description: Updates an existing media item in the shared media catalog. Authentication required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the media item
 *         schema:
 *           type: string
 *           example: 69acc350d5e6123967dababf
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: Up
 *               type:
 *                 type: string
 *                 example: movie
 *               releaseYear:
 *                 type: integer
 *                 example: 2009
 *               duration:
 *                 type: integer
 *                 example: 96
 *               seasons:
 *                 type: integer
 *                 example: 8
 *               genre:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [animation, adventure]
 *               director:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: [Pete Docter]
 *               mpaRating:
 *                 type: string
 *                 example: pg
 *               description:
 *                 type: string
 *                 example: Updated media description.
 *     responses:
 *       200:
 *         description: Media item updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Media'
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Media item not found
 *       422:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.put(
  '/:id',
  requireAuth,
  validateObjectId('id'),
  validateMediaMiddleware(true),
  mediaController.updateMedia
);

// DELETE a media item by ID
/**
 * @swagger
 * /api/media/{id}:
 *   delete:
 *     summary: Delete a media item by ID
 *     tags: [Media]
 *     description: Deletes a media item from the shared media catalog. Authentication required.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: MongoDB ObjectId of the media item
 *         schema:
 *           type: string
 *           example: 69acc350d5e6123967dababf
 *     responses:
 *       204:
 *         description: Media item deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Media item deleted successfully
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Media item not found
 *       500:
 *         description: Server error
 */
router.delete(
  '/:id',
  requireAuth,
  validateObjectId('id'),
  mediaController.deleteMedia
);

module.exports = router;
