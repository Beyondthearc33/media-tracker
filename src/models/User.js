/* ********************************
 *  models/user.js
 * ******************************* */

const mongoose = require('mongoose');

// User Schema
const userSchema = new mongoose.Schema
(
  {
    githubId: {
      type: String,
      required: true,
      unique: true
    },
    username: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    email: {
      type: String
    },
    avatarUrl: {
      type: String
    },
    {timestamps: true}
  }
);

module.exports = mongoose.model('User', userSchema);