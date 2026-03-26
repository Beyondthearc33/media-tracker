/* ***************************
 *  controllers/collectionsController.js
 * ************************** */
const mongoose = require('mongoose');
const Collection = require('../models/Collection');

/* ***************************
 * GET /api/collections
 * Return only collections that belong to the logged-in user
 * *************************** */
exports.getAllCollections = async (req, res) => {
  try {
    const userId = req.user._id;

    // Only return collections owned by the authenticated user
    const collections = await Collection.find({ userId });

    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ***************************
 * GET /api/collections/:id
 * *************************** */
exports.getCollectionById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid collection id' });
    }

    // Find by BOTH collection id and owner id
    const collection = await Collection.findOne({ _id: id, userId });

    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ***************************
 * POST /api/collections
 * *************************** */
exports.createCollection = async (req, res) => {
  try {
    const userId = req.user._id;

    // Build the document manually so ownership always comes from req.user
    const newCollection = new Collection({
      ...req.body,
      userId,
    });

    const savedCollection = await newCollection.save();

    res.status(201).json(savedCollection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ***************************
 * PUT /api/collections/:id
 * *************************** */
exports.updateCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid collection id' });
    }

    // Prevent client from changing the collection owner
    const updateData = { ...req.body };
    delete updateData.userId;

    const updatedCollection = await Collection.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCollection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    res.status(200).json(updatedCollection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ***************************
 * DELETE /api/collections/:id
 * *************************** */
exports.deleteCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid collection id' });
    }

    const deletedCollection = await Collection.findOneAndDelete({ _id: id, userId });

    if (!deletedCollection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    res.status(200).json({ message: 'Collection deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ***************************
 * POST /api/collections/:id/items
 * Add mediaId to a collection only if the collection belongs to the logged-in user
 * *************************** */
exports.addItemToCollection = async (req, res) => {
  try {
    const { id } = req.params;
    const { mediaId } = req.body;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid collection id' });
    }

    if (!mediaId) {
      return res.status(400).json({ message: 'mediaId is required' });
    }

    if (!mongoose.Types.ObjectId.isValid(mediaId)) {
      return res.status(400).json({ message: 'Invalid media id' });
    }

    // Use $addToSet so the same media item is not added twice
    const updatedCollection = await Collection.findOneAndUpdate(
      { _id: id, userId },
      { $addToSet: { mediaIds: mediaId } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCollection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    res.status(200).json(updatedCollection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ***************************
 * DELETE /api/collections/:id/items/:mediaId
 * *************************** */
exports.removeItemFromCollection = async (req, res) => {
  try {
    const { id, mediaId } = req.params;
    const userId = req.user._id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid collection id' });
    }

    if (!mongoose.Types.ObjectId.isValid(mediaId)) {
      return res.status(400).json({ message: 'Invalid media id' });
    }

    const updatedCollection = await Collection.findOneAndUpdate(
      { _id: id, userId },
      { $pull: { mediaIds: mediaId } },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedCollection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    res.status(200).json(updatedCollection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};