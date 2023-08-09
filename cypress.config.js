const { defineConfig } = require("cypress");
const dotenv = require("dotenv");

dotenv.config();

module.exports = defineConfig({
  defaultCommandTimeout: 30000,
  responseTimeout: 30000,
  requestTimeout: 30000,
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  env: {
    APP_URL: process.env.CYPRESS_APP_URL,
    API_URL: process.env.CYPRESS_API_URL,
    USERNAME: process.env.CYPRESS_USERNAME,
    PASSWORD: process.env.CYPRESS_PASSWORD,
    MAILSLURP_API_KEY: process.env.CYPRESS_MAILSLURP_API_KEY,
  },
});
