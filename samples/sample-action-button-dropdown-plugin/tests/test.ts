// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from '@playwright/test';
import { Sample } from '../../../tests/core/sample';
import { ELEMENT_WAIT_LONGER_TIME } from '../../../tests/core/constants';
import { elements as e } from './elements';

export class ActionsButtonDropdown extends Sample {
  async test() {
    await this.modPage.page.waitForSelector(e.whiteboard, { timeout: ELEMENT_WAIT_LONGER_TIME });
    await this.modPage.page.click(e.actions);
    await this.modPage.hasElement(e.pluginSeparator, 'should display the separator element injected by the plugin');
    await this.modPage.hasElement(e.pluginButton, 'should display the button element injected by the plugin');
    await this.modPage.hasText(e.pluginButton, 'Button injected by plugin', 'should display the correct text on the injected button');
    const [consoleMessage] = await Promise.all([
      this.modPage.waitForPluginLogger(),
      this.modPage.page.click(e.pluginButton),
    ]);
    expect(
      consoleMessage.text(),
      'should display the expected log from the plugin button correctly',
    ).toContain('Log that the button from sample-action-button-dropdown-plugin has been clicked');
  }
}
