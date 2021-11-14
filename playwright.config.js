const PORT = process.env.PORT || '3000';

// @ts-check
/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  webServer: {
    command: 'yarn start',
    port: PORT,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: `http://localhost:${PORT}/`,
  },
};

module.exports = config;