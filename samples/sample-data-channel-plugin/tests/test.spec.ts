/* eslint-disable import/no-extraneous-dependencies */
import { expect, ConsoleMessage } from '@playwright/test';
import { createSampleTest } from '../../../tests/core/fixtures/sampleFixture';
import { checkPluginAvailability } from '../../../tests/core/fixtures/sampleBeforeAll';
import { elements as e } from './elements';
import { ELEMENT_WAIT_LONGER_TIME, PLUGIN_LOGGER_NAME } from '../../../tests/core/constants';
import { extractObject } from '../../../tests/utils/extractObject';

interface PluginDataChannelPayload {
  first_example_field: number;
  second_example_field: string;
}

interface PluginDataChannelEntry {
  createdAt: string;
  channelName: string;
  subChannelName: string;
  entryId: string;
  payloadJson: PluginDataChannelPayload;
  createdBy: string;
  pluginName: string;
  toRoles: string[] | null;
}

interface DataChannelResponseData {
  data: PluginDataChannelEntry[];
  loading: boolean;
}

interface DataChannelResponse {
  dataResponseDefaultAllItems: DataChannelResponseData;
  dataResponseDefaultLastItem: DataChannelResponseData;
  dataResponseNewSubChannel: DataChannelResponseData;
}

const { test, setPluginUrl, getPluginUrl } = createSampleTest({
  envVarName: 'DATA_CHANNEL_URL',
  getPluginUrl: () => process.env.DATA_CHANNEL_URL,
});

test.describe.parallel('Data Channel', () => {
  test.beforeAll(checkPluginAvailability({
    pluginName: 'sample-data-channel-plugin',
    envVarName: 'DATA_CHANNEL_URL',
    setPluginUrl,
    getPluginUrl,
  }));

  test('should increment data channel values and wipe data correctly', async ({ sampleTest }): Promise<void> => {
    await sampleTest.modPage.page.waitForSelector(
      e.whiteboard,
      { timeout: ELEMENT_WAIT_LONGER_TIME },
    );
    await sampleTest.modPage.page.click(e.mediaArea);
    const incrementDataChannelButton = sampleTest.modPage.getLocator(
      e.incrementDataChannelButtonPlugin,
    );
    const wipeDataOffButtonPlugin = sampleTest.modPage.getLocator(e.wipeDataOffButtonPlugin);
    await expect(incrementDataChannelButton, 'should display the increment data channel button injected by the plugin').toBeVisible();
    await expect(wipeDataOffButtonPlugin, 'should display increment data channel button injected by plugin').toBeVisible();

    // get the last console message as sample plugin logs a few incomplete data first
    const consoleMessages: ConsoleMessage[] = [];
    const consoleHandler = (msg: ConsoleMessage) => {
      if (msg.text().includes(PLUGIN_LOGGER_NAME)) {
        consoleMessages.push(msg);
      }
    };
    sampleTest.modPage.page.on('console', consoleHandler);
    await incrementDataChannelButton.click();
    await sampleTest.modPage.page.waitForTimeout(1000);
    sampleTest.modPage.page.off('console', consoleHandler);

    // check console messages on first increment click
    const lastConsoleMessage = consoleMessages[consoleMessages.length - 1];
    const extractedObject = extractObject<DataChannelResponse>(lastConsoleMessage.text());
    expect(extractedObject?.dataResponseDefaultAllItems, 'should have dataResponseDefaultAllItems in the first increment response').toBeDefined();
    expect(extractedObject?.dataResponseNewSubChannel, 'should have dataResponseNewSubChannel in the first increment response').toBeDefined();
    expect(typeof extractedObject?.dataResponseDefaultAllItems.loading, 'should have loading property as boolean in dataResponseDefaultAllItems').toBe('boolean');
    expect(extractedObject?.dataResponseDefaultAllItems.data, 'should have data array in dataResponseDefaultAllItems').toBeDefined();
    expect(extractedObject?.dataResponseDefaultAllItems.loading, 'should have loading property defined in dataResponseDefaultAllItems').toBeDefined();
    expect(extractedObject?.dataResponseDefaultLastItem, 'should have dataResponseDefaultLastItem in the first increment response').toBeDefined();
    expect(extractedObject?.dataResponseDefaultLastItem?.data[0]?.payloadJson, 'should have correct payload data after first increment with field value 1').toMatchObject({ first_example_field: 1, second_example_field: 'string as an example' });

    await sampleTest.modPage.page.click(e.mediaArea);
    sampleTest.modPage.page.on('console', consoleHandler);
    await incrementDataChannelButton.click();
    await sampleTest.modPage.page.waitForTimeout(1000);
    sampleTest.modPage.page.off('console', consoleHandler);

    // check console messages on second increment click
    const secondConsoleMessage = consoleMessages[consoleMessages.length - 1];
    const secondExtractedObject = extractObject<DataChannelResponse>(secondConsoleMessage.text());
    expect(secondExtractedObject?.dataResponseDefaultLastItem?.data[0]?.payloadJson, 'should have correct payload data after second increment with field value 2').toMatchObject({ first_example_field: 2, second_example_field: 'string as an example' });

    await sampleTest.modPage.page.click(e.mediaArea);
    sampleTest.modPage.page.on('console', consoleHandler);
    await wipeDataOffButtonPlugin.click();
    await sampleTest.modPage.page.waitForTimeout(1000);
    sampleTest.modPage.page.off('console', consoleHandler);

    // check console messages on wipe data click
    const wipeConsoleMessage = consoleMessages[consoleMessages.length - 1];
    const wipeExtractedObject = extractObject<DataChannelResponse>(wipeConsoleMessage.text());
    expect(wipeExtractedObject?.dataResponseDefaultAllItems.data, 'should have empty data array in dataResponseDefaultAllItems after wipe').toHaveLength(0);
    expect(wipeExtractedObject?.dataResponseNewSubChannel.data, 'should have empty data array in dataResponseNewSubChannel after wipe').toHaveLength(0);
    expect(wipeExtractedObject?.dataResponseDefaultLastItem.data, 'should have empty data array in dataResponseDefaultLastItem after wipe').toHaveLength(0);
  });
});
