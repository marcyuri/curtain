import { defineConfig, devices } from "@playwright/test";

export default defineConfig({

    testDir: "./e2e",

    fullyParallel: true,

    retries: 0,

    webServer: {
        command: "npm run preview",
        url: "http://localhost:4173",
        reuseExistingServer: true,
        timeout: 30000,
    },

    use: {
        baseURL: "http://localhost:4173",
    },

    projects: [
        {
            name: "chromium",
            use: { ...devices["Desktop Chrome"] },
        },
    ],

});
