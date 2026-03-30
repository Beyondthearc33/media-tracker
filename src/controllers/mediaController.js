const Media = require('../models/Media');
const mongoose = require('mongoose');
const { validateMedia } = require('../helpers/validate');

/* ***************************
 * GET /api/media
 * *************************** */
const getAllMedia = async (req, res, next) => {
  try {
    const media = await Media.find();
    res.status(200).json(media);
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * GET /api/media/:id
 * *************************** */
const getMediaById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error('Invalid media ID');
      err.statusCode = 400;
      return next(err);
    }

    const media = await Media.findById(id);

    if (!media) {
      const err = new Error('Media not found');
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json(media);
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * POST /api/media
 * *************************** */
const createMedia = async (req, res, next) => {
  try {
    const errors = validateMedia(req.body);

    if (errors.length > 0) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    const newMedia = new Media(req.body);
    const savedMedia = await newMedia.save();

    res.status(201).json(savedMedia);
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * PUT /api/media/:id
 * *************************** */
const updateMedia = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error('Invalid media ID');
      err.statusCode = 400;
      return next(err);
    }

    if (!req.body || Object.keys(req.body).length === 0) {
      const err = new Error('At least one field is required for update');
      err.statusCode = 400;
      return next(err);
    }

    const errors = validateMedia(req.body, true);

    if (errors.length > 0) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    // Build update object safely
    const updateData = { ...req.body };

    // Remove undefined fields
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updatedMedia = await Media.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedMedia) {
      const err = new Error('Media not found');
      err.statusCode = 404;
      return next(err);
    }

    res.status(200).json(updatedMedia);
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * DELETE /api/media/:id
 * *************************** */
const deleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error('Invalid media ID');
      err.statusCode = 400;
      return next(err);
    }

    const deletedMedia = await Media.findByIdAndDelete(id);

    if (!deletedMedia) {
      const err = new Error('Media not found');
      err.statusCode = 404;
      return next(err);
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMedia,
  getMediaById,
  createMedia,
  updateMedia,
  deleteMedia,
};