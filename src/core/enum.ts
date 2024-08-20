import { DataChannelHooks } from '../data-channel/enums';
import { DomElementManipulationHooks } from '../dom-element-manipulation/enums';
import { DataConsumptionHooks } from '../data-consumption/enums';

export enum HookEvents {
  BBB_CORE_SENT_NEW_DATA = 'BBB_CORE_SENT_NEW_DATA',
  PLUGIN_MODIFIED_SUBSCRIPTION_TO_BBB_CORE = 'PLUGIN_MODIFIED_SUBSCRIPTION_TO_BBB_CORE',
  PLUGIN_SUBSCRIBED_TO_BBB_CORE = 'PLUGIN_SUBSCRIBED_TO_BBB_CORE',
  PLUGIN_UNSUBSCRIBED_FROM_BBB_CORE = 'PLUGIN_UNSUBSCRIBED_FROM_BBB_CORE',
}

export type Hooks = DataConsumptionHooks | DataChannelHooks | DomElementManipulationHooks;
