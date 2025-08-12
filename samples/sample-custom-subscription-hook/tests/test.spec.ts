/* eslint-disable import/no-extraneous-dependencies */
import { expect } from '@playwright/test';
import { createSampleTest } from '../../../tests/core/fixtures/sampleFixture';
import { checkPluginAvailability } from '../../../tests/core/fixtures/sampleBeforeAll';
import { elements as e } from './elements';
import { ELEMENT_WAIT_LONGER_TIME } from '../../../tests/core/constants';
import { extractObject } from '../../../tests/utils/extractObject';

interface NextSlideData {
  pres_presentation: {
    pages: {
      num: number;
      urlsJson: {
        png: string;
        svg: string;
        text: string;
      };
    }[];
  }[];
}

const { test, setPluginUrl, getPluginUrl } = createSampleTest({
  envVarName: 'CUSTOM_SUBSCRIPTION_HOOK_URL',
  getPluginUrl: () => process.env.CUSTOM_SUBSCRIPTION_HOOK_URL,
});

test.describe.parallel('Custom Subscription Hook', () => {
  test.beforeAll(checkPluginAvailability({
    pluginName: 'sample-custom-subscription-hook',
    envVarName: 'CUSTOM_SUBSCRIPTION_HOOK_URL',
    setPluginUrl,
    getPluginUrl,
  }));

  test('should display the button with icon and log when clicked', async ({ sampleTest }): Promise<void> => {
    await sampleTest.modPage.page.waitForSelector(
      e.whiteboard,
      { timeout: ELEMENT_WAIT_LONGER_TIME },
    );

    await sampleTest.modPage.hasElement(e.presentationToolbarWrapper, 'should display the presentation toolbar element');
    const logNextSlideDataButton = sampleTest.modPage.getLocator(e.logNextSlideDataButton);
    await expect(logNextSlideDataButton, 'should display the log next slide data button injected by the plugin').toBeVisible();
    await expect(logNextSlideDataButton, 'should have the correct text value').toHaveText('Log data for next slide');

    const [consoleMessage] = await Promise.all([
      sampleTest.modPage.waitForPluginLogger(),
      logNextSlideDataButton.click(),
    ]);

    const extractedObject = extractObject<NextSlideData>(consoleMessage.text());
    expect(extractedObject, 'should be a valid JavaScript object').toBeTruthy();

    const pages = extractedObject?.pres_presentation?.[0]?.pages[0];
    const urlsJson = pages?.urlsJson;
    expect(pages?.num, 'should log the correct number of second slide').toBe(2);
    expect(urlsJson?.png, 'should log the correct PNG URL for the second slide').toBeDefined();
    expect(urlsJson?.png, 'PNG URL should be a valid URL').toMatch(/^https?:\/\/.+/);
    expect(urlsJson?.svg, 'should log the correct SVG URL for the second slide').toBeDefined();
    expect(urlsJson?.svg, 'SVG URL should be a valid URL').toMatch(/^https?:\/\/.+/);
    expect(urlsJson?.text, 'should log the correct TEXT URL for the second slide').toBeDefined();
    expect(urlsJson?.text, 'TEXT URL should be a valid URL').toMatch(/^https?:\/\/.+/);

    const skipSlideSelect = sampleTest.modPage.page.locator(e.skipSlide);
    const options = await skipSlideSelect.locator('option').all();
    expect(options.length, 'presentation should have more than 1 slide for the plugin to perform as expected').toBeGreaterThan(1);
    await skipSlideSelect.selectOption({ index: options.length - 1 });
    await expect(sampleTest.modPage.page.locator(e.nextSlide), 'should disable the next slide button when on the last slide').toBeDisabled();
    await sampleTest.modPage.page.waitForTimeout(1000); // wait for next slide to be loaded

    const [consoleMessage2] = await Promise.all([
      sampleTest.modPage.waitForPluginLogger(),
      logNextSlideDataButton.click(),
    ]);

    const extractedObject2 = extractObject<NextSlideData>(consoleMessage2.text());
    expect(extractedObject2, 'should be a valid JavaScript object').toBeTruthy();
    const pages2 = extractedObject2?.pres_presentation?.[0]?.pages;
    expect(pages2, 'should not log any data of next slide when on the last slide').toEqual([]);
  });
});
