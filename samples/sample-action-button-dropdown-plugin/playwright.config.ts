import { defineConfig } from '@playwright/test';
import defaultPlaywrightConfig from '../../playwright.config';

export default defineConfig({
  ...defaultPlaywrightConfig,
});
