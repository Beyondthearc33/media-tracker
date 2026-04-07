/* ***************************
 *  server.js
 * ************************** */

require('dotenv').config();

const app = require('./app');
const { connectToDatabase } = require('./db/connect');

const PORT = process.env.PORT || 3000;

// Start the server after DB check
async function startServer() {
  try {
    await connectToDatabase();
    console.log('[server] MongoDB connection verified');

    app.listen(PORT, () => {
      console.log(`[server] Server running on ${PORT}`);
    });
  } catch (error) {
    console.error('[server] Failed to start server because MongoDB connection failed:');
    console.error(error);
    process.exit(1);
  }
}

startServer();
