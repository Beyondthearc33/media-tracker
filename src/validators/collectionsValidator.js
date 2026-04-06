/* ***************************
 * validators/collectionsValidator.js
 * *************************** */

const mongoose = require('mongoose');

// Existing validation
const validateCollection = (data, isUpdate = false) => {
  const errors = [];

  if (!isUpdate || data.name !== undefined) {
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
      errors.push('Collection name is required and must be at least 2 characters');
    }
  }

  if (data.description !== undefined) {
    if (typeof data.description !== 'string') {
      errors.push('Description must be a string');
    }
  }

  if (data.mediaIds !== undefined) {
    if (!Array.isArray(data.mediaIds)) {
      errors.push('mediaIds must be an array');
    }
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