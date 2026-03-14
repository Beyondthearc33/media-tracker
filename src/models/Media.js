const mongoose = require("mongoose");

const mediaSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    type: {
      type: String,
      required: true,
      enum: ["Movie", "TV Show"]
    },
    releaseYear: {
      type: Number
    },
    duration: {
      type: Number
    },
    genre: {
      type: String
    },
    director: {
      type: String
    },
    cast: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Media", mediaSchema);