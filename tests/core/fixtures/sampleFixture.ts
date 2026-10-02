/* eslint-disable import/no-extraneous-dependencies */
import { test as base } from '@playwright/test';
import { Sample } from '../sample';
import { encodeCustomParams } from '../helpers';
import { getMediaBridgeCreateParam } from '../mediaBridge';

export interface SampleTestFixtures {
  sampleTest: Sample;
}

export type SampleTestConfig = {
  envVarName: string;
  getPluginUrl?: () => string | undefined;
};

export function createSampleTest(config: SampleTestConfig) {
  let pluginUrl: string | undefined = process.env[config.envVarName];

  const test = base.extend<SampleTestFixtures>({
    sampleTest: async ({ browser, context, page }, use) => {
      const customUrl = config.getPluginUrl?.() || pluginUrl;
      if (!customUrl) {
        throw new Error(`Plugin URL is not set. Either set ${config.envVarName} environment variable or ensure beforeAll has run successfully.`);
      }

      const createParameter = [
        encodeCustomParams(`pluginManifests=${JSON.stringify([{ url: customUrl }])}`),
        getMediaBridgeCreateParam(),
      ].filter(Boolean).join('&');
      const sampleTest = new Sample({ browser, context });
      await sampleTest.initModPage(page, { createParameter });
      await use(sampleTest);
    },
  });

  return {
    test,
    setPluginUrl: (url: string) => {
      pluginUrl = url;
    },
    getPluginUrl: () => pluginUrl,
  };
}
