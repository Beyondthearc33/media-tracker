/* ***************************
 *  db/connect.js
 * ************************** */
const mongoose = require('mongoose');

async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri) {
    throw new Error('[db/connect] MONGODB_URI is not defined in .env');
  }

  if (!dbName) {
    throw new Error('[db/connect] DB_NAME is not defined in .env');
  }

  await mongoose.connect(uri, {
    dbName,
  });

  console.log(`[db/connect] Connected to MongoDB database: ${dbName}`);
}

module.exports = {
  connectToDatabase,
};
