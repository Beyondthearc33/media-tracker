// models/Collection.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
    },

    description: {
      type: String,
      trim: true,
    },

    mediaIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Media',
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('Collection', collectionSchema);
