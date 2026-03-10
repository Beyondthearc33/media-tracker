/* ***************************
 *  server.js
 * ************************** */

// Load environment variables
require("dotenv").config();

const express = require("express");

// Database connection
const { connectToDatabase } = require("./db/connect");

// App creation
const app = express();

// Global middleware
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.send("Media Tracker API is running");
});

// Server configuration
const PORT = process.env.PORT || 3000;

// Start the server after DB check
async function startServer() {
  try {
    await connectToDatabase();
    console.log("[server] MongoDB connection verified");

    app.listen(PORT, () => {
      console.log(`[server] Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(
      "[server] Failed to start server because MongoDB connection failed:"
    );
    console.error(error);
    process.exit(1);
  }
}

startServer();