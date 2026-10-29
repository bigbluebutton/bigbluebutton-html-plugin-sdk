import { coreElements } from '../../../tests/core/coreElements';

// The client keys a plugin sidekick app as `generic-content-sidekick<id>`.
const sidekickAppKey = 'generic-content-sidekickfirst-sidekick-component';

export const elements = {
  ...coreElements,
  incrementBadgeOption: 'div[data-test="incrementSidekickBadge"]',
  appsGallerySidebarButton: 'div[data-test="appsGallerySidebarButton"]',
  appsGalleryGridView: 'button[data-test="appsGalleryGridView"]',
  appsGalleryListView: 'button[data-test="appsGalleryListView"]',
  sidekickGalleryBadge: `div[data-test="${sidekickAppKey}GalleryBadge"]`,
};
