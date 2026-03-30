/* ***************************
 * helpers/validate.js
 * *************************** */
const mongoose = require("mongoose");

// Validate Collection
const validateCollection = (data, isUpdate = false) => {
  const errors = [];

  if (!isUpdate || data.name !== undefined) {
    if (!data.name || data.name.trim().length < 2) {
      errors.push("Collection name is required and must be at least 2 characters");
    }
  }

  if (data.description && typeof data.description !== "string") {
    errors.push("Description must be a string");
  }

  return errors;
};

// Validate Library Item
const validateLibraryItem = (data, isUpdate = false) => {
  const errors = [];

  const validStatuses = ["watching", "completed", "plan_to_watch", "dropped"];

  if (!isUpdate || data.mediaId !== undefined) {
    if (!data.mediaId) {
      errors.push("mediaId is required");
    }
  }

  if (!isUpdate && !data.status) {
    errors.push("Status is required");
  }

  if (data.mediaId && !mongoose.Types.ObjectId.isValid(data.mediaId)) {
    errors.push("Invalid mediaId");
  }

  if (data.status !== undefined && !validStatuses.includes(data.status)) {
    errors.push("Invalid status value");
  }

  if (data.userRating !== undefined) {
    if (typeof data.userRating !== "number" || data.userRating < 1 || data.userRating > 5) {
      errors.push("User rating must be a number between 1 and 5");
    }
  }

  return errors;
};

const validateMedia = (data, isUpdate = false) => {
  const errors = [];

  const validTypes = ['movie', 'tv'];
  const validRatings = ['g', 'pg', 'pg-13', 'r', 'nc-17', 'tv-ma', 'tv-14'];

  // Title
  if (!isUpdate || data.title !== undefined) {
    if (!data.title || data.title.trim().length === 0) {
      errors.push('Title is required');
    }
  }

  // Type
  if (!isUpdate || data.type !== undefined) {
    if (!validTypes.includes(data.type)) {
      errors.push("Type must be 'movie' or 'tv'");
    }
  }

  // Release Year
  if (!isUpdate || data.releaseYear !== undefined) {
    if (
      typeof data.releaseYear !== 'number' ||
      data.releaseYear < 1888 ||
      data.releaseYear > new Date().getFullYear()
    ) {
      errors.push('Invalid release year');
    }
  }

  // Duration (movies only)
  if (data.type === 'movie') {
    if (!isUpdate || data.duration !== undefined) {
      if (typeof data.duration !== 'number' || data.duration <= 0) {
        errors.push('Duration must be a positive number for movies');
      }
    }
  }

  // Seasons (tv only)
  if (data.type === 'tv') {
    if (!isUpdate || data.seasons !== undefined) {
      if (typeof data.seasons !== 'number' || data.seasons <= 0) {
        errors.push('Seasons must be a positive number for TV shows');
      }
    }
  }

  // Arrays
  ['genre', 'director', 'cast'].forEach((field) => {
    if (data[field] !== undefined && !Array.isArray(data[field])) {
      errors.push(`${field} must be an array`);
    }
  });

  // MPA Rating
  if (data.mpaRating !== undefined) {
    if (!validRatings.includes(data.mpaRating.toLowerCase())) {
      errors.push('Invalid MPA rating');
    }
  }

  return errors;
};

module.exports = {
  validateCollection,
  validateLibraryItem,
  validateMedia,
};