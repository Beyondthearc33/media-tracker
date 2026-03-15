const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const collectionSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    mediaItems: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Media'
        }
    ]
});

module.exports = mongoose.model('Collection', collectionSchema);