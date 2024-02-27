import { ExternalVideoVolumeUiDataNames } from './enums';

export type ExternalVideoVolumeUiDataPayloads = {
  [ExternalVideoVolumeUiDataNames.CURRENT_VOLUME_VALUE]: {
    value: number;
  },
  [ExternalVideoVolumeUiDataNames.IS_VOLUME_MUTED]: {
    value: boolean;
  },
};
