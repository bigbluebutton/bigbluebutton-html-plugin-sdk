import { ExternalVideoVolumeEventsNames } from './enums';

export type ExternalVideoVolumeEventPayloads = {
  [ExternalVideoVolumeEventsNames.VOLUME_VALUE_CHANGED]: {
    value: number;
  },
};
