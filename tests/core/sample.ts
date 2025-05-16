import { Page, Browser, BrowserContext } from '@playwright/test';
import { InitOptions, SessionPage } from './sessionPage';

interface SampleProps {
  browser: Browser;
  context: BrowserContext;
}

export class Sample {
  readonly browser: Browser;
  readonly context: BrowserContext;
  modPage: SessionPage;

  constructor({ browser, context }: SampleProps) {
    this.browser = browser;
    this.context = context;
  }

  async initModPage(page: Page, {
    fullName = 'Moderator',
    shouldCloseAudioModal = true,
    ...restOptions
  }: InitOptions = {}) {
    const options = { fullName, ...restOptions };
    this.modPage = new SessionPage({ browser: this.browser, page });
    await this.modPage.init({ isModerator: true, shouldCloseAudioModal, initOptions: options });
  }
}
