import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Get environment from command line or default to 'local'
      const env = process.env.CYPRESS_ENV || config.env.env || 'local';
      
      // Load environments from config
      const envConfig = config.env as { environments?: { [key: string]: string } };
      const environments = envConfig.environments;

      if (!environments) {
        throw new Error("Environments configuration is missing.");
      }

      // Use provided baseUrl or fall back to environments config
      config.baseUrl = process.env.CYPRESS_BASE_URL || environments[env];

      if (!config.baseUrl) {
        throw new Error(`Base URL for environment '${env}' is not defined.`);
      }

      // Set auth token from environment variable if provided
      if (process.env.CYPRESS_AUTH_TOKEN) {
        config.env.authToken = process.env.CYPRESS_AUTH_TOKEN;
      }

      console.log(`Using environment: ${env} with baseUrl: ${config.baseUrl}`);

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