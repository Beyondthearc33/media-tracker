/* ***************************
 *  server.js
 * ************************** */
// Load Environment variables
require('dotenv').config();

const express = require('express');

// Database Connection
const { connectToDatabase } = require('./db/connect');

// App creation
const app = express();
// Server Configuration
const PORT = process.env.PORT || 3000;

// Start the server after DB check
async function startServer() {
  try {
    // Verify DB connection
    await connectToDatabase();
    console.log('[server] MongoDB connection verified');

    // Start listening only after DB is ready
    app.listen(PORT, () => {
      console.log(`[server] Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      '[server] Failed to start server because MongoDB connection failed:'
    );
    console.error(error);

    // Exit with failure
    process.exit(1);
  }
}

startServer();
