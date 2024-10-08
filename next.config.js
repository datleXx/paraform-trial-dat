/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  staticPageGenerationTimeout: 2000,
  images: {
    domains: ["media.licdn.com", "lh3.googleusercontent.com"],
  },
};

export default config;
