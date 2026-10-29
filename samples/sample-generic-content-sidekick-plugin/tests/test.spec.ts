// eslint-disable-next-line import/no-extraneous-dependencies
import { expect } from '@playwright/test';
import { createSampleTest } from '../../../tests/core/fixtures/sampleFixture';
import { checkPluginAvailability } from '../../../tests/core/fixtures/sampleBeforeAll';
import { ELEMENT_WAIT_LONGER_TIME } from '../../../tests/core/constants';
import { SessionPage } from '../../../tests/core/sessionPage';
import { elements as e } from './elements';

const { test, setPluginUrl, getPluginUrl } = createSampleTest({
  envVarName: 'GENERIC_CONTENT_SIDEKICK_URL',
  getPluginUrl: () => process.env.GENERIC_CONTENT_SIDEKICK_URL,
});

async function incrementMenuBadge(modPage: SessionPage) {
  await modPage.page.waitForSelector(e.whiteboard, { timeout: ELEMENT_WAIT_LONGER_TIME });
  await modPage.page.click(e.mediaArea);
  await modPage.page.click(e.incrementBadgeOption);
}

async function switchGalleryView(modPage: SessionPage, viewButton: string) {
  await modPage.page.click(viewButton);
  await expect(
    modPage.getLocator(viewButton),
    'should switch the apps gallery view',
  ).toHaveAttribute('aria-pressed', 'true');
}

test.describe.parallel('Generic content sidekick', () => {
  test.beforeAll(checkPluginAvailability({
    pluginName: 'sample-generic-content-sidekick-plugin',
    envVarName: 'GENERIC_CONTENT_SIDEKICK_URL',
    setPluginUrl,
    getPluginUrl,
  }));

  test('should show a menu badge set while the apps gallery is closed', async ({ sampleTest }): Promise<void> => {
    const { modPage } = sampleTest;
    await expect(
      modPage.getLocator(e.appsGallerySidebarButton),
      'should start with the apps gallery closed',
    ).toHaveAttribute('aria-expanded', 'false');

    await incrementMenuBadge(modPage);
    await modPage.page.click(e.appsGallerySidebarButton);

    await modPage.hasElement(e.sidekickGalleryBadge, 'should display the badge set while the apps gallery was closed');
    await modPage.hasText(e.sidekickGalleryBadge, '1', 'should display the badge content set by the plugin');
  });

  test.describe('Apps gallery view', () => {
    // The panel takes 20% of the window width, and at the default 1280px it is too
    // narrow for the grid view, which the client then disables.
    test.use({ viewport: { width: 1920, height: 1080 } });

    test('should keep the menu badge when switching the apps gallery view', async ({ sampleTest }): Promise<void> => {
      const { modPage } = sampleTest;
      await modPage.page.click(e.appsGallerySidebarButton);
      await switchGalleryView(modPage, e.appsGalleryGridView);

      await incrementMenuBadge(modPage);
      await modPage.hasText(e.sidekickGalleryBadge, '1', 'should display the badge in the grid view');

      await switchGalleryView(modPage, e.appsGalleryListView);
      await modPage.hasText(e.sidekickGalleryBadge, '1', 'should keep the badge after switching to the list view');

      await switchGalleryView(modPage, e.appsGalleryGridView);
      await modPage.hasText(e.sidekickGalleryBadge, '1', 'should keep the badge after switching back to the grid view');
    });
  });
});
