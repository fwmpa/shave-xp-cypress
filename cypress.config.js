const { defineConfig } = require("cypress");

const { removeUser } = require("./cypress/support/tasks/database.js");

module.exports = defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            on("task", {
                removeUser,
            });
        },
        viewportWidth: 1920,
        viewportHeight: 1080,
        baseUrl: "http://localhost:3000"
    },
});
