/* eslint-disable import/no-extraneous-dependencies */
import { test as base, expect, TestInfo } from '@playwright/test';
import { secret, server } from '../../../tests/core/parameters';
import { Sample } from '../../../tests/core/sample';
import { encodeCustomParams } from '../../../tests/core/helpers';
import { elements as e } from './elements';
import { extractObject } from './utils/extractObject';

let pluginUrl: string | undefined = process.env.ACTIONS_BAR_URL;

const test = base.extend<{
  sampleTest: Sample;
}>({
  sampleTest: async ({ browser, context, page }, use) => {
    if (!pluginUrl) throw new Error('Plugin URL is not set from beforeAll.');
    const createParameter = encodeCustomParams(`pluginManifests=${JSON.stringify([{ url: pluginUrl }])}`);
    const sampleTest = new Sample({ browser, context });
    await sampleTest.initModPage(page, { createParameter });
    await use(sampleTest);
  },
});

test.describe.parallel('Action bar', () => {
  test.beforeAll(async ({ request }, testInfo: TestInfo) => {
    if (!server) return test.skip(true, 'No server URL variable provided. Skipping test');
    if (!secret) return test.skip(true, 'No server secret variable provided. Skipping test');

    const serverDomain = new URL(server).origin;
    const manifestUrlPath = '/plugins/sample-actions-bar-plugin/dist/manifest.json';
    pluginUrl = `${serverDomain}${manifestUrlPath}`;

    const response = await request.get(pluginUrl);
    test.skip(!response.ok(), `Failed to fetch plugin manifest for ${testInfo.title} plugin. returned status ${response.status()}`);

    try {
      return response.json();
    } catch (error) {
      return test.skip(error, `Invalid JSON response from plugin manifest for ${testInfo.title} plugin`);
    }
  });

  test('should log expected message when custom SVG button is clicked', async ({ sampleTest }) => {
    await sampleTest.modPage.hasElement(e.actionsBarButtonCustomSvg, 'should display the button with custom SVG');
    const [consoleMessage] = await Promise.all([
      sampleTest.modPage.waitForPluginLogger(),
      sampleTest.modPage.page.click(e.actionsBarButtonCustomSvg),
    ]);
    expect(
      consoleMessage.text(),
      'should display the expected log when the button with custom SVG is clicked',
    ).toContain('The actions bar button from plugin was clicked');
  });

  test('should handle selector button click and log expected values', async ({ sampleTest }) => {
    await sampleTest.modPage.hasElement(e.actionsBarButtonSelector, 'should display the button with selector');
    const inputLocator = sampleTest.modPage.getLocator(e.actionsBarButtonSelector).locator('input');
    await inputLocator.focus();
    await inputLocator.click({ force: true });
    const [consoleMessage] = await Promise.all([
      sampleTest.modPage.waitForPluginLogger(),
      sampleTest.modPage.page.click('li[data-value="1"]'),
    ]);

    expect.soft(
      consoleMessage.text(),
      'should log the expected string when the selector button is clicked',
    ).toContain('The actions bar selector has changed ');
    expect.soft(
      extractObject<{ value?: string }>(consoleMessage.text())?.value,
      'should log the expected value in the object when the selector button is clicked',
    ).toBe(1);
    expect(inputLocator, 'should change to the expected new value').toHaveValue('1');
  });

  test('should verify selector icon has correct class', async ({ sampleTest }) => {
    await sampleTest.modPage.hasElement(e.actionsBarButtonSelectorIcon, 'should display the button with selector icon');
    const iconLocator = sampleTest.modPage.getLocator(e.actionsBarButtonSelectorIcon).locator('i');
    expect(
      iconLocator,
      'should have the bbb-whiteboard class for the icon',
    ).toHaveClass(/icon-bbb-whiteboard/);
  });

  test('should handle toggle group button click and log expected values', async ({ sampleTest }) => {
    await sampleTest.modPage.hasElement(e.actionsBarButtonToggleGroup, 'should display the button with toggle group');
    const toggleGroupItemLocator = sampleTest.modPage.getLocator(e.actionsBarButtonToggleGroup).locator('button[value="1"]');
    const [consoleMessage] = await Promise.all([
      sampleTest.modPage.waitForPluginLogger(),
      toggleGroupItemLocator.click(),
    ]);

    expect.soft(
      consoleMessage.text(),
      'should log the expected string when the toggle group button is clicked',
    ).toContain('The actions bar toggle group has changed');
    expect.soft(
      extractObject<{ value?: string }>(consoleMessage.text())?.value,
      'should log the expected value in the object when the toggle group button is clicked',
    ).toBe(1);
    expect.soft(toggleGroupItemLocator, '').toHaveClass(/Mui-selected/);
    expect(toggleGroupItemLocator, '').toHaveAttribute('aria-pressed', 'true');
  });
});
