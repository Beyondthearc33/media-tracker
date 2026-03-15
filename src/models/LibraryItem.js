const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const librarySchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  mediaId: {
    type: Schema.Types.ObjectId,
    ref: 'Media',
    required: true
  },
  status: {
    type: String,
    enum: ['watching', 'completed', 'plan_to_watch', 'dropped'],
    default: 'plan_to_watch'
  },
  rating: {
    type: Number,
    min: 1,
    max: 5
  }
});

librarySchema.index({ userId: 1, mediaId: 1 }, { unique: true }); // implements duplicate prevention (userId + mediaId)

module.exports = mongoose.model('LibraryItem', librarySchema);