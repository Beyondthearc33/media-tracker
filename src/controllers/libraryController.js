/* ***************************
 *  controllers/libraryController.js
 * ************************** */
const LibraryItem = require('../models/LibraryItem');
const mongoose = require('mongoose');

if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({ success: false, message: 'Invalid ID' });
}

/* ***************************
 * GET /api/library
 * *************************** */
exports.getAllLibraryItems = async (req, res, next) => {
  try {
    const userId = req.user._id;

    // Only return items owned by the authenticated user
    const items = await LibraryItem.find({ userId });

    res.status(200).json(items);
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * GET /api/library/:id
 * *************************** */
exports.getLibraryItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    // Find the item by BOTH _id and userId
    const libraryItem = await LibraryItem.findOne({ _id: id, userId });

    if (!libraryItem) {
      return res.status(404).json({
        success: false,
        message: 'Library item not found',
      });
    }

    res.status(200).json(libraryItem);
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * POST /api/library
 * *************************** */
exports.createLibraryItem = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const newItem = new LibraryItem({
      mediaId: req.body.mediaId,
      status: req.body.status,
      userRating: req.body.userRating,
      notes: req.body.notes,
      userId,
    });

    const savedItem = await newItem.save();

    res.status(201).json(savedItem); // Created
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB throws error 11000 when duplicates happen
      return res.status(400).json({
        success: false,
        message: 'Media already exists in library',
      });
    }

    next(error);
  }
};

/* ***************************
 * PUT /api/library/:id
 * *************************** */
exports.updateLibraryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const updateData = {
      mediaId: req.body.mediaId,
      status: req.body.status,
      userRating: req.body.userRating,
      notes: req.body.notes,
    };

    // remove undefined
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    delete updateData.userId;

    const updatedItem = await LibraryItem.findOneAndUpdate(
      { _id: id, userId },
      updateData,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!updatedItem) {
      return res.status(404).json({
        success: false,
        message: 'Library item not found',
      });
    }

    res.status(200).json(updatedItem);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: 'Media already exists in library',
      });
    }

    next(error);
  }
};

/* ***************************
 * DELETE /api/library/:id
 * *************************** */
exports.deleteLibraryItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user._id;

    const deletedItem = await LibraryItem.findOneAndDelete({ _id: id, userId });

    if (!deletedItem) {
      return res.status(404).json({
        success: false,
        message: 'Library item not found',
      });
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
};
