import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  projects: [
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    // {
    //   name: 'Desktop Firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'Desktop Safari',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
  use: {
    baseURL: "http://localhost:5173",
  },
  reporter: [
    ["html", { outputFolder: "playwright-report" }], // Génère un rapport HTML
    ["json", { outputFile: "playwright-report/results.json" }], // Génère un rapport JSON
    ["junit", { outputFile: "playwright-report/results.xml" }],
  ],
});
