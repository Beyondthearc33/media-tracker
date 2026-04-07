/* *********************************
 *  controllers/mediaController.js
 * ********************************** */
const Media = require('../models/Media');

/* ***************************
 * GET /api/media
 * *************************** */
exports.getAllMedia = async (req, res, next) => {
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
exports.getMediaById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const media = await Media.findById(id);

    if (!media) {
      return res.status(404).json({
        success: false,
        message: 'Media not found',
      });
    }

    res.status(200).json(media);
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * POST /api/media
 * *************************** */
exports.createMedia = async (req, res, next) => {
  try {
    const mediaData = { ...req.body };

    if (mediaData.mpaRating) {
      mediaData.mpaRating = mediaData.mpaRating.toLowerCase();
    }

    const newMedia = new Media(mediaData);
    const savedMedia = await newMedia.save();

    res.status(201).json(savedMedia);
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * PUT /api/media/:id
 * *************************** */
exports.updateMedia = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    if (updateData.mpaRating) {
      updateData.mpaRating = updateData.mpaRating.toLowerCase();
    }

    // Remove undefined fields
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] === undefined) {
        delete updateData[key];
      }
    });

    const updatedMedia = await Media.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!updatedMedia) {
      return res.status(404).json({
        success: false,
        message: 'Media not found',
      });
    }

    res.status(200).json(updatedMedia);
  } catch (error) {
    next(error);
  }
};

/* ***************************
 * DELETE /api/media/:id
 * *************************** */
exports.deleteMedia = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedMedia = await Media.findByIdAndDelete(id);

    if (!deletedMedia) {
      return res.status(404).json({
        success: false,
        message: 'Media not found',
      });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
