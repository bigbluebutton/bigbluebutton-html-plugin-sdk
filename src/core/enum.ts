import { DataChannelHooks } from '../data-channel/enums';
import { DomElementManipulationHooks } from '../dom-element-manipulation/enums';
import { DataConsumptionHooks } from '../data-consumption/enums';

export enum HookEvents {
  BBB_CORE_SENT_NEW_DATA = 'BBB_CORE_SENT_NEW_DATA',
  BBB_CORE_UPDATED_MEETING_STATUS = 'BBB_CORE_UPDATED_MEETING_STATUS',
  /**
   * PLUGIN_SENT_CHANGES_TO_BBB_CORE is used to:
   *  - Comunicate that the subscription has changed for the dom-element-manipulation hook;
   *  - Send replace/delete event for useDataChannel;
   */
  PLUGIN_SENT_CHANGES_TO_BBB_CORE = 'PLUGIN_SENT_CHANGES_TO_BBB_CORE',
  PLUGIN_SUBSCRIBED_TO_BBB_CORE = 'PLUGIN_SUBSCRIBED_TO_BBB_CORE',
  PLUGIN_UNSUBSCRIBED_FROM_BBB_CORE = 'PLUGIN_UNSUBSCRIBED_FROM_BBB_CORE',
}

export const GENERIC_HOOK_PLUGIN = 'GENERIC_HOOK_PLUGIN';

export type Hooks = DataConsumptionHooks | DataChannelHooks
| DomElementManipulationHooks | typeof GENERIC_HOOK_PLUGIN;
