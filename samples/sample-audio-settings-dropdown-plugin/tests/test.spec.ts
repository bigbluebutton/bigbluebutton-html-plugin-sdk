/* eslint-disable import/no-extraneous-dependencies */
import { expect } from '@playwright/test';
import { createSampleTest } from '../../../tests/core/fixtures/sampleFixture';
import { checkPluginAvailability } from '../../../tests/core/fixtures/sampleBeforeAll';
import { elements as e } from './elements';
import { ELEMENT_WAIT_LONGER_TIME } from '../../../tests/core/constants';

const { test, setPluginUrl, getPluginUrl } = createSampleTest({
  envVarName: 'AUDIO_SETTINGS_DROPDOWN_URL',
  getPluginUrl: () => process.env.AUDIO_SETTINGS_DROPDOWN_URL,
});

test.describe.parallel('Audio Settings Dropdown', () => {
  test.beforeAll(checkPluginAvailability({
    pluginName: 'sample-audio-settings-dropdown-plugin',
    envVarName: 'AUDIO_SETTINGS_DROPDOWN_URL',
    setPluginUrl,
    getPluginUrl,
  }));

  test('should display the button with icon and log when clicked', async ({ sampleTest }): Promise<void> => {
    await sampleTest.modPage.page.waitForSelector(
      e.whiteboard,
      { timeout: ELEMENT_WAIT_LONGER_TIME },
    );
    await sampleTest.modPage.page.click(e.joinAudioButton);
    await sampleTest.modPage.clickMicrophoneButton();
    await sampleTest.modPage.page.click(e.joinEchoTestButton);
    await sampleTest.modPage.wasRemoved(
      e.establishingAudioLabel,
      'should remove the establishing audio label once audio is established',
      ELEMENT_WAIT_LONGER_TIME,
    );
    await sampleTest.modPage.page.click(e.audioDropdownMenu);

    const audioSettingsButton = sampleTest.modPage.getLocator(e.pluginAudioSettingsDropdownButton);
    await expect.soft(audioSettingsButton, 'should display the audio settings dropdown button injected by the plugin').toBeVisible();
    const iconElement = audioSettingsButton.locator('i');
    await expect.soft(iconElement, 'should contain correct icon class').toHaveClass(/icon-bbb-user/);
    const [consoleMessage] = await Promise.all([
      sampleTest.modPage.waitForPluginLogger(),
      sampleTest.modPage.page.click(e.pluginAudioSettingsDropdownButton),
    ]);
    expect(
      consoleMessage.text(),
      'should display the expected log from the plugin button correctly',
    ).toContain('Log from audio settings dropdown plugin');
  });
});
