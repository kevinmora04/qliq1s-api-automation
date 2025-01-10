import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    projectId: "cf9cp3",
    setupNodeEvents(on, config) {
      // Get environment from command line or GitHub Actions
      const targetEnv = process.env.CYPRESS_ENV || 
                       (config.env && config.env.env) || 
                       'local';

      // Load environments configuration
      const environments = {
        local: "https://uat-api.qliq1s.com/api",
        uat: "https://uat-api.qliq1s.com/api",
        prod: "https://api.qliq1s.com/api"
      };

      // Set baseUrl based on environment
      config.baseUrl = process.env.CYPRESS_BASE_URL || environments[targetEnv];

      if (!config.baseUrl) {
        throw new Error(`Base URL for environment '${targetEnv}' is not defined.`);
      }

      // Set auth token if provided
      if (process.env.CYPRESS_AUTH_TOKEN) {
        config.env = config.env || {};
        config.env.authToken = process.env.CYPRESS_AUTH_TOKEN;
      }

      console.log(`Using environment: ${targetEnv} with baseUrl: ${config.baseUrl}`);

      return config;
    },
    retries: {
      runMode: 2,
      openMode: 0
    },
  },
  viewportWidth: 2200,
  viewportHeight: 1400,
});