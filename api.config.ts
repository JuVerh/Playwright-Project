import { PlaywrightTestConfig } from '@playwright/test'

const config: PlaywrightTestConfig = {
  timeout: 60000,
  retries: 0,
  testDir: 'tests/api',
  use: {
    //browser-specific options
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 100000,
    ignoreHTTPSErrors: true,
    video: 'off',
    screenshot: 'off',
  },
  // Configure projects for major browsers.
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
    {
      name: 'firefox',
      use: { browserName: 'firefox' },
    },
    {
      name: 'webkit',
      use: { browserName: 'webkit' },
    },
  ],
}

export default config
