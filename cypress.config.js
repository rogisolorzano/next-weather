const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {},
    supportFile: "cypress/support.js",
    baseUrl: "http://localhost:3010",
  },
});
