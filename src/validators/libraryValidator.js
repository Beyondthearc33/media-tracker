/* ***************************
 * validators/libraryValidator.js
 * *************************** */
const mongoose = require('mongoose');

const validateLibrary = (data, isUpdate = false) => {
  const errors = [];

  const validStatuses = ['watching', 'completed', 'plan_to_watch', 'dropped'];

  if (!isUpdate || data.mediaId !== undefined) {
    if (!data.mediaId) {
      errors.push('mediaId is required');
    } else if (!mongoose.Types.ObjectId.isValid(data.mediaId)) {
      errors.push('Invalid mediaId');
    }
  }

  if (!isUpdate || data.status !== undefined) {
    if (!data.status) {
      errors.push('Status is required');
    } else if (!validStatuses.includes(data.status)) {
      errors.push('Invalid status value');
    }
  }

  if (data.userRating !== undefined) {
    if (
      typeof data.userRating !== 'number' ||
      !Number.isFinite(data.userRating) ||
      data.userRating < 1 ||
      data.userRating > 5
    ) {
      errors.push('User rating must be between 1 and 5');
    }
  }

  if (data.notes !== undefined && typeof data.notes !== 'string') {
    errors.push('Notes must be a string');
  }

  return errors;
};

// Middleware
const validateLibraryMiddleware = (isUpdate = false) => {
  return (req, res, next) => {
    const errors = validateLibrary(req.body, isUpdate);

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
        message: `${paramName} must be a valid ObjectId`,
      });
    }

    next();
  };
};

module.exports = {
  validateLibraryMiddleware,
  validateObjectId,
};