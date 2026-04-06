/* ***************************
 * validators/collectionsValidator.js
 * *************************** */

const validateCollection = (data, isUpdate = false) => {
  const errors = [];

  if (!isUpdate || data.name !== undefined) {
    if (!data.name || typeof data.name !== 'string' || data.name.trim().length < 2) {
      errors.push('Collection name is required and must be at least 2 characters');
    }
  }

  if (data.description !== undefined) {
    if (data.description !== undefined) {
      if (typeof data.description !== 'string') {
        errors.push('Description must be a string');
      }
    }
  }

  if (data.mediaIds !== undefined) {
    if (!Array.isArray(data.mediaIds)) {
      errors.push('mediaIds must be an array');
    }
  }

  return errors;
};

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

module.exports = validateCollectionMiddleware;