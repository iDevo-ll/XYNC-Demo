/**
 * =================================== DEMO PROJECT FOR XNCPlugin ============================
 * This project demonstrates the XYNGINC plugin in a realistic production-like environment,
 * ideal for testing its features on a live VPS setup.
 *
 * IMPORTANT: After cloning this repo, update to the latest versions of "xynginc" and "xypriss"
 * packages to ensure you have the most recent features and security updates.
 *
 * *******************************************************************************************
 */

import { createServer } from "xypriss";

// Import server configuration
import { serverConfig } from "./configs/xypriss.config";

// Import route handlers
import router from "./routes/index";

/**
 * Create and configure the XyPriss application server
 * This initializes the server with all configured features and middleware
 */
const app = createServer(serverConfig);

/**
 * Setup API routes
 * Define your application routes and handlers
 */

app.use("/api", router);

app.start(() => {
  console.log(
    `📊 Health check: http://localhost:${__sys__.vars.__PORT__}/health`,
  );
  console.log(
    `📋 API status: http://localhost:${__sys__.vars.__port__}/api/status`,
  );
  console.log(`� Press Ctrl+C to stop the server`);
});

/**
 * Export the app instance for testing
 * Allows importing the app in test files
 */
export default app;
