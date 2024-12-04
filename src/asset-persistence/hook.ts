import {
  AssetPersistenceDetails,
} from './types';
import { AssetPersistenceEvents, AssetType } from './enums';

export const persistAssetFunctionWrapper = (
  pluginName: string,
  assetUrl: string,
  typeOfAsset: AssetType,
  assetName?: string,
) => {
  window.dispatchEvent(
    new CustomEvent<
    AssetPersistenceDetails>(AssetPersistenceEvents.ASSET_PERSISTED, {
      detail: {
        pluginName,
        assetUrl,
        typeOfAsset,
        assetName,
      },
    }),
  );
};
