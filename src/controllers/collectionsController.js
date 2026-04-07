/* ***************************
 *  controllers/collectionsController.js
 * ************************** */
const Collection = require('../models/Collection');
const mongoose = require('mongoose');

if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({ success: false, message: 'Invalid ID' });
}

/* ***************************
 * GET /api/collections
 * Return only collections that belong to the logged-in user
 * *************************** */
exports.getAllCollections = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Only return collections owned by the authenticated user
    const collections = await Collection.find({ userId });

    res.status(200).json(collections);
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * GET /api/collections/:id
 * *************************** */
exports.getCollectionById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Find by BOTH collection id and owner id
    const collection = await Collection.findOne({ _id: id, userId });

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found',
      });
    }

    res.status(200).json(collection);
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * POST /api/collections
 * *************************** */
exports.createCollection = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Build the document manually so ownership always comes from req.user
    // and mediaIds are managed only through the /items endpoints
    const newCollection = new Collection({
      name: req.body.name,
      description: req.body.description,
      userId,
    });

    const savedCollection = await newCollection.save();

    res.status(201).json(savedCollection);
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * PUT /api/collections/:id
 * Do not allow the client to change ownership or mediaIds
 * *************************** */
exports.updateCollection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const updateData = {
      name: req.body.name,
      description: req.body.description,
    };

    // Remove undefined fields so partial updates still work cleanly
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updatedCollection = await Collection.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedCollection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found',
      });
    }

    res.status(200).json(updatedCollection);
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * DELETE /api/collections/:id
 * *************************** */
exports.deleteCollection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deletedCollection = await Collection.findOneAndDelete({ _id: id, userId });

    if (!deletedCollection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found',
      });
    }

    // res.status(200).json({
    //   success: true,
    //   message: 'Collection deleted successfully',
    // });

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * POST /api/collections/:id/items
 * Add mediaId to a collection only if the collection belongs to the logged-in user
 * *************************** */
exports.addItemToCollection = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { mediaId } = req.body;
    const userId = req.user._id;

    // Use $addToSet so the same media item is not added twice
    const updatedCollection = await Collection.findOneAndUpdate(
      { _id: id, userId },
      { $addToSet: { mediaIds: mediaId } },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!mediaId) {
      return res.status(400).json({
        success: false,
        message: 'mediaId is required',
      });
    }

    if (!updatedCollection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found',
      });
    }

    res.status(200).json(updatedCollection);
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * DELETE /api/collections/:id/items/:mediaId
 * *************************** */
exports.removeItemFromCollection = async (req, res, next) => {
  try {
    const { id, mediaId } = req.params;
    const userId = req.user._id;

    const updatedCollection = await Collection.findOneAndUpdate(
      { _id: id, userId },
      { $pull: { mediaIds: mediaId } },
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedCollection) {
      return res.status(404).json({
        success: false,
        message: 'Collection not found',
      });
    }

    res.status(200).json(updatedCollection);
  } catch (error) {
    next(error);
  }
};
