import { devices, type PlaywrightTestConfig } from '@playwright/test';

const port = process.env['PORT'] ?? '4200';
const localAddress = process.env['LOCAL_ADDRESS'] ?? 'localhost';
const isCI = !!process.env['CI'];

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: './playwright/e2e',
  snapshotDir: './playwright/snapshots',
  outputDir: './playwright/results/tests',
  /* Maximum time one test can run for. */
  timeout: 30 * 1000,
  expect: {
    /**
     * Maximum time expect() should wait for the condition to be met.
     * For example in `await expect(locator).toHaveText();`
     */
    timeout: 5000,
    toHaveScreenshot: { maxDiffPixels: 0, threshold: 0.075 }
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!isCI,
  /* Retry on CI only */
  retries: isCI ? 1 : 0,
  /* Use fixed number of workers. */
  workers: 4,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ['html', { open: 'on-failure', outputFolder: './playwright/results/preview' }],
    [
      'junit',
      {
        outputFile: `./playwright/results/reports/report-e2e.xml`
      }
    ],    
    isCI ? ['line'] : ['list']
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Maximum time each action such as `click()` can take. Defaults to 0 (no limit). */
    actionTimeout: 0,
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: `http://${localAddress}:${port}`,

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: isCI ? 'on-first-retry' : 'retain-on-failure',

    viewport: {
      width: 1000,
      height: 660
    },

    /* Screenshot on failure */
    screenshot: 'only-on-failure',

    video: isCI ? 'on-first-retry' : 'retain-on-failure'
  },

  /* Configure projects for major browsers, webkit is currently flaky */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--disable-skia-runtime-opts',
            '--force-color-profile=srgb',
            '--disable-low-res-tiling',
            '--disable-oop-rasterization',
            '--disable-composited-antialiasing',
            '--disable-smooth-scrolling'
          ]
        }
      }
    }
  ],
  webServer: {
    command: 'npm run start:prod',
    url: `http://${localAddress}:${port}`,
    reuseExistingServer: !isCI
  }
};

export default config;
