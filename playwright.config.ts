import * as constants from 'config/constants';

import type { PlaywrightTestConfig } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  globalSetup: require.resolve('./tests/global-setup'),
  testDir: './tests',
  /* Maximum time one test can run for. */
  timeout: 300 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    extraHTTPHeaders: {
      // We set this header per GitHub guidelines.
      Accept: 'application/json',
      'X-RapidAPI-Key': constants.bncKey,
      'X-RapidAPI-Host': constants.bncHost
    }
  },

  projects: [
    {
      name: 'bravenewcoin',
      testDir: './tests/api/',
      testMatch: /.\/tests\/api\/.*.spec.ts/,
      retries: 0
    }
  ]
};

export default config;
