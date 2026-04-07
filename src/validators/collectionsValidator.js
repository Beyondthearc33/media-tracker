/* ***************************
 * validators/collectionsValidator.js
 * *************************** */

const mongoose = require('mongoose');

// Existing validation
const validateCollection = (data, isUpdate = false) => {
  const errors = [];

  // Name
  if (!isUpdate || data.name !== undefined) {
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
      errors.push('Collection name is required and must be at least 2 characters');
    }
  }

  // mediaIds cannot be set during creation
  if (!isUpdate && data.mediaIds !== undefined) {
    errors.push('mediaIds cannot be set during creation');
  }

  // Description
  if (data.description !== undefined) {
    if (typeof data.description !== 'string') {
      errors.push('Description must be a string');
    }
  }

  // mediaIds must be an array if provided (only for updates)
  if (data.mediaIds !== undefined) {
    errors.push('mediaIds cannot be modified directly. Use /items endpoints.');
  }

  return errors;
};

// Middleware for body validation
const validateCollectionMiddleware = (isUpdate = false) => {
  return (req, res, next) => {
    const errors = validateCollection(req.body, isUpdate);

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    next();
  };
};

// Validate ObjectId param
const validateObjectId = (paramName) => {
  return (req, res, next) => {
    const value = req.params[paramName];

    if (!mongoose.Types.ObjectId.isValid(value)) {
      return res.status(400).json({
        success: false,
        // message: `Invalid ${paramName}`,
        message: `${paramName} must be a valid ObjectId`,
      });
    }

    next();
  };
};

// Validate mediaId in body
const validateMediaIdBody = (req, res, next) => {
  const { mediaId } = req.body;

  if (!mediaId) {
    return res.status(400).json({
      success: false,
      message: 'mediaId is required',
    });
  }

  if (!mongoose.Types.ObjectId.isValid(mediaId)) {
    return res.status(400).json({
      success: false,
      message: 'Invalid media id',
    });
  }

  next();
};

module.exports = {
  validateCollectionMiddleware,
  validateObjectId,
  validateMediaIdBody,
};
