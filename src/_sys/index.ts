import { createServer } from "xypriss";

export const _sys = {
  __version: "1.0.0",
  __author: "iDevo -- https://github.com/iDevo-ll",
  __app_urls: {},
  __name: "xynginc-demo",
  __alias: "xncpd",
  __port: parseInt(process.env["PORT"] || "9837"),
  __env: (process.env["NODE_ENV"] || "development") as ENV["env"],
};

export type ENV = NonNullable<Parameters<typeof createServer>[0]>;
