/* ***************************
 * validators/mediaValidator.js
 * *************************** */

const mongoose = require('mongoose');

const validateMedia = (data = {}, isUpdate = false) => {
  const errors = [];

  const validTypes = ['movie', 'tv'];
  const validRatings = ['g', 'pg', 'pg-13', 'r', 'nc-17', 'tv-ma', 'tv-14'];

  if (!isUpdate || data.title !== undefined) {
    if (!data.title || typeof data.title !== 'string' || data.title.trim().length === 0) {
      errors.push('Title is required');
    }
  }

  if (!isUpdate || data.type !== undefined) {
    if (!validTypes.includes(data.type)) {
      errors.push("Type must be 'movie' or 'tv'");
    }
  }

  if (!isUpdate || data.releaseYear !== undefined) {
    if (
      typeof data.releaseYear !== 'number' ||
      data.releaseYear < 1888 ||
      data.releaseYear > new Date().getFullYear()
    ) {
      errors.push('Invalid release year');
    }
  }

  if (data.type === 'movie') {
    if (!isUpdate || data.duration !== undefined) {
      if (typeof data.duration !== 'number' || data.duration <= 0) {
        errors.push('Duration must be a positive number for movies');
      }
    }
  }

  if (data.type === 'tv') {
    if (!isUpdate || data.seasons !== undefined) {
      if (typeof data.seasons !== 'number' || data.seasons <= 0) {
        errors.push('Seasons must be a positive number for TV shows');
      }
    }
  }

  ['genre', 'director', 'cast'].forEach((field) => {
    if (data[field] !== undefined && !Array.isArray(data[field])) {
      errors.push(`${field} must be an array`);
    }
  });

  if (data.mpaRating !== undefined) {
    if (!validRatings.includes(data.mpaRating.toLowerCase())) {
      errors.push('Invalid MPA rating');
    }
  }

  return errors;
};

// Middleware
const validateMediaMiddleware = (isUpdate = false) => {
  return (req, res, next) => {
    const errors = validateMedia(req.body, isUpdate);

    if (errors.length > 0) {
      return res.status(422).json({
        success: false,
        message: 'Validation failed',
        errors,
      });
    }

    next();
  };
};

// ObjectId validation
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
  validateMediaMiddleware,
  validateObjectId,
};
