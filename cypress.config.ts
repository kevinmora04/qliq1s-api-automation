import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const envConfig = config.env as { environments?: { [key: string]: string } };
      const environments = envConfig.environments;

      if (!environments) {
        throw new Error("Environments configuration is missing.");
      }

      const env = typeof config.env === 'string' ? config.env : (config.env.env || 'local');
      const baseUrl = environments[env];

      if (!baseUrl) {
        throw new Error(`Base URL for environment '${env}' is not defined.`);
      }

      config.baseUrl = baseUrl;

      console.log(`Using environment: ${env} with baseUrl: ${baseUrl}`);

      return config;
    },
    retries: 0,
  },
  viewportWidth: 2200, 
  viewportHeight: 1400,
});