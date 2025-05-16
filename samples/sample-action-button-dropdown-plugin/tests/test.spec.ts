// eslint-disable-next-line import/no-extraneous-dependencies
import { test, TestInfo } from '@playwright/test';
import { server } from '../../../tests/core/parameters';
import { encodeCustomParams } from '../../../tests/core/helpers';
import { ActionsButtonDropdown } from './test';

let pluginUrl: string;

test.describe.parallel('Action button dropdown', () => {
  test.beforeAll(async ({ request }, testInfo: TestInfo) => {
    if (!server) return test.skip(true, 'No server variable provided. Skipping test');

    const serverDomain = new URL(server).origin;
    const manifestUrlPath = '/plugins/sample-action-button-dropdown-plugin/dist/manifest.json';
    pluginUrl = `${serverDomain}${manifestUrlPath}`;
    const response = await request.get(pluginUrl);
    test.skip(!response.ok(), `Failed to fetch plugin manifest for ${testInfo.title} plugin. returned status ${response.status()}`);
    try {
      return response.json();
    } catch (error) {
      return test.skip(error, `Invalid JSON response from plugin manifest for ${testInfo.title} plugin`);
    }
  });

  test('should display and log when clicked', async ({ browser, context, page }): Promise<void> => {
    if (!pluginUrl) test.skip(true, 'Plugin URL is not set from beforeAll.');

    const sampleTest = new ActionsButtonDropdown({ browser, context });
    const createParameter = encodeCustomParams(`pluginManifests=${JSON.stringify([{ url: pluginUrl }])}`);
    await sampleTest.initModPage(page, { createParameter });
    return sampleTest.test();
  });
});
