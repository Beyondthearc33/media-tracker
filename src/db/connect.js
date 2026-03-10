/* ***************************
 *  db/connect.js
 * ************************** */
const { MongoClient } = require('mongodb');

let db;

// Connect to MongoDB
async function connectToDatabase() {
  if (db) {
    return db;
  }

  // Environment Variable
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.DB_NAME;

  if (!uri) {
    throw new Error('[db/connect] MONGODB_URI is not defined in .env');
  }

  if (!dbName) {
    throw new Error('[db/connect] DB_NAME is not defined in .env');
  }

  const client = new MongoClient(uri);
  await client.connect();

  db = client.db(dbName);
  console.log(`[db/connect] Connected to MongoDB database: ${dbName}`);

  return db;
}

module.exports = {
  connectToDatabase,
};
