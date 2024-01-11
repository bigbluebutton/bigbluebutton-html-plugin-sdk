import { DataChannelHooks } from '../data-channel/enums';
import { DomElementManipulationHooks } from '../dom-element-manipulation/enums';
import { DataConsumptionHooks } from '../data-consumption/enums';

export enum HookEvents {
  UPDATED = 'HOOK_DATA_UPDATED',
  SUBSCRIBED = 'PLUGIN_SUBSCRIBED_TO_HOOK',
  UNSUBSCRIBED = 'PLUGIN_UNSUBSCRIBED_FROM_HOOK'
}

export type Hooks = DataConsumptionHooks | DataChannelHooks | DomElementManipulationHooks;
