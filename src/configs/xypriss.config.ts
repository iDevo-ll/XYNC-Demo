/**
 * XyPriss Server Configuration
 *
 * This module contains the complete server configuration for your XyPriss application.
 * All server settings, security options, performance tuning, and feature flags
 * are centralized here for easy management and maintenance.
 * You can also load this configuration from "xypriss.config.json" if you prefer to use JSON.
 *
 * @fileoverview Server configuration with comprehensive feature support
 * @version 1.1.2
 * @author XyPriss Team
 * @since 2025-01-01
 *
 * @example
 * ```typescript
 * import { serverConfig } from './configs/xypriss.config.js';
 * const app = createServer(serverConfig);
 * ```
 */

import { ServerOptions } from "xypriss";
import { _sys } from "../_sys/index.js";
import { serv_host } from "./host.conf.js";
import XNCP from "xynginc";
import { domains } from "./xyncp.config.js";

/**
 * Main server configuration object
 * Comprehensive configuration with security, performance, and feature flags
 */
export const serverConfig: ServerOptions = {
  /**
   * Environment configuration
   * Controls application behavior based on deployment environment
   */
  env: _sys.__env,

  /**
   * Server-specific settings
   * Network configuration and basic server options
   */
  server: {
    /** Server port - defaults to environment PORT or system default */
    port: _sys.__port,

    /** Server host - defaults to localhost for development */
    host: serv_host,

    /** Trust proxy settings for reverse proxy deployments */
    trustProxy: process.env.TRUST_PROXY === "true",

    /** Enable automatic JSON body parsing */
    autoParseJson: true,

    /** JSON payload size limit */
    jsonLimit: "10mb",

    /** URL-encoded payload size limit */
    urlEncodedLimit: "10mb",

    /** Service identification for optimization system */
    serviceName: _sys.__name,
    version: _sys.__version,
  },

  plugins: {
    register: [
      /**
       * These domains are test domains provided by nehonix team
       * You would need to replace it with your own domain
       */
      XNCP({
        autoDownload: true,
        installRequirements: true,
        domains: [
          {
            domain: domains.d1, // Replace with your domain
            port: 9837,
            ssl: false, // for this first server, we won't use SSL
            email: "no-exist@nehonix.xyz", // Replace with your email
          },
          // {
          //   domain: domains.d2, // Replace with your domain
          //   port: 7365,
          //   ssl: true, // for this second server, we will use SSL
          //   email: "no-exist@nehonix.xyz", // Replace with your email
          // },
        ],
      }),
    ],
  },

  multiServer: {
    /** Enable multi-server mode */
    enabled: true, // "enabled = true" will activate the multi server mode

    /** Array of server configurations */
    servers: [
      {
        // I've added a domain as "ID" for better identification (to help you understand)
        // But you can changed to anything else than a domain if needed. This won't affect
        // the functionality of the server.
        id: domains.d1,
        port: 9837,
        routePrefix: "/api/v1",
        allowedRoutes: ["/api/v1/*"],
        server: {
          host: "localhost",
          jsonLimit: "20mb",
        },
      },
      {
        id: domains.d2,
        port: 7365,
        routePrefix: "/admin",
        allowedRoutes: ["/admin/*"],
      },
    ],
  },
};

/**
 * Export the configuration for use in other modules
 * This allows importing the config in server.ts and other files
 */
export default serverConfig;
