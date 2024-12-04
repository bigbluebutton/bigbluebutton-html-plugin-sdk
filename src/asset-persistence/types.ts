import { AssetType } from './enums';

export interface AssetPersistenceDetails {
  pluginName: string;
  assetUrl: string;
  typeOfAsset: AssetType;
  assetName?: string;
}

export type PersistAssetFunction = (
  assetUrl: string,
  typeOfAsset: AssetType,
  assetName?: string,
) => void;
