import { defineConfig, devices } from '@playwright/test';
import { CI, ELEMENT_WAIT_LONGER_TIME, ELEMENT_WAIT_TIME } from './tests/core/constants';
import { server } from './tests/core/parameters';

export default defineConfig({
  testDir: process.cwd(),
  workers: CI ? 1 : undefined,
  retries: CI ? 1 : 0,
  fullyParallel: true,
  forbidOnly: CI,
  reporter: CI
    ? [['list'], ['blob']]
    : [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: server,
    headless: true,
    trace: 'on',
    screenshot: 'on',
    video: CI ? 'retain-on-failure' : 'on',
    actionTimeout: ELEMENT_WAIT_LONGER_TIME,
    viewport: { width: 1280, height: 720 },
    launchOptions: {
      slowMo: 0,
    },
    permissions: ['clipboard-read', 'clipboard-write', 'camera', 'microphone'],
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          args: [
            '--no-sandbox',
            '--ignore-certificate-errors',
            '--use-fake-ui-for-media-stream',
            '--use-fake-device-for-media-stream',
            '--allow-file-access-from-files',
          ],
        },
      },
    },
  ],
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.05,
    },
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.05,
    },
    timeout: ELEMENT_WAIT_TIME,
  },
});
