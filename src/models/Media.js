// models/Media.js

const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ['movie', 'tv'],
    },

    releaseYear: {
      type: Number,
      required: true,
      min: 1888, // The year of the first known film
      max: new Date().getFullYear(),
    },

    duration: {
      type: Number,
      min: 1,
      // Only required if it's a movie
      required: function () {
        return this.type === 'movie';
      },
    },

    seasons: {
      type: Number,
      min: 1,
      // Only required if it's a TV show
      required: function () {
        return this.type === 'tv';
      },
    },

    genre: {
      type: [String],
      default: [],
    },

    director: {
      type: [String],
      default: [],
    },

    cast: {
      type: [String], // Optional
      default: [],
    },

    mpaRating: {
      type: String,
      enum: ['g', 'pg', 'pg-13', 'r', 'nc-17', 'tv-ma', 'tv-14'],
      lowercase: true,
    },

    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true, // createdAt + updatedAt
  },
);

module.exports = mongoose.model('Media', mediaSchema);
