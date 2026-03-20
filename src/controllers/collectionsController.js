const Collection = require('../models/Collection');

/* ***************************
 * GET /api/collections
 * *************************** */
exports.getAllCollections = async (req, res) => {
  try {
    const collections = await Collection.find();

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
    const collection = await Collection.findById(req.params.id);

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
    const newCollection = new Collection(req.body);
    const savedCollection = await newCollection.save();

    res.status(201).json(savedCollection); // Created
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ***************************
 * PUT /api/collections/:id
 * *************************** */
exports.updateCollection = async (req, res) => {
  try {
    const updatedCollection = await Collection.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true },
    );

    if (!updatedCollection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    res.status(200).json(updatedCollection);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

/* ***************************
 * DELETE /api/collections/:id
 * *************************** */
exports.deleteCollection = async (req, res) => {
  try {
    const deletedCollection = await Collection.findByIdAndDelete(req.params.id);

    if (!deletedCollection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ***************************
 * POST /api/collections/:id/items
 * *************************** */
exports.addItemToCollection = async (req, res) => {
  try {
    const { mediaId } = req.body;

    if (!mediaId) {
      return res.status(400).json({ message: 'mediaId is required' });
    }

    const updatedCollection = await Collection.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { mediaItems: mediaId } },
      { new: true },
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
    const updatedCollection = await Collection.findByIdAndUpdate(
      req.params.id,
      { $pull: { mediaItems: req.params.mediaId } },
      { new: true },
    );

    if (!updatedCollection) {
      return res.status(404).json({ message: 'Collection not found' });
    }

    res.status(200).json(updatedCollection);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
