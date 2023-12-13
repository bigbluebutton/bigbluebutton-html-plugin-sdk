import { UseLoadedUserListFunction } from 'src/data-consumption/domain/users/loaded-user-list/types';
import { UseCurrentUserFunction } from 'src/data-consumption/domain/users/current-user/types';
import {
  UseCurrentPresentationFunction,
} from 'src/data-consumption/domain/presentations/current-presentation/types';
import { UseUsersBasicInfoFunction } from 'src/data-consumption/domain/users/users-basic-info/types';
import {
  UseCustomSubscriptionFunction,
} from '../../data-consumption/domain/shared/custom-subscription/types';
import {
  UseDataChannelFunctionFromPluginApi,
} from '../../data-channel/types';
import { uiCommands } from '../../ui-commands/commands';
import {
  CustomSubscriptionHookOptions,
} from '../../index';
import {
  PluginApi,
  PluginBrowserWindow,
} from './types';
import { useDataChannel } from '../../data-channel/hooks';
import {
  useCurrentPresentation,
} from '../../data-consumption/domain/presentations/current-presentation/hooks';
import {
  useCustomSubscription,
} from '../../data-consumption/domain/shared/custom-subscription/hooks';
import { useLoadedUserList } from '../../data-consumption/domain/users/loaded-user-list/hooks';
import { useCurrentUser } from '../../data-consumption/domain/users/current-user/hooks';
import { useUsersBasicInfo } from '../../data-consumption/domain/users/users-basic-info/hooks';
import { getSessionToken } from '../auxiliary/session-token/getter';
import { getJoinUrl } from '../auxiliary/join-url/getter';
import { usePluginSettings } from '../../data-consumption/domain/settings';
import { EventPayloads, UiEventsHookEventWrapper, UseUiEventFunction } from '../../ui-events/types';
import { useUiEvent } from '../../ui-events/hooks';

declare const window: PluginBrowserWindow;

/**
 * Class responsible for either initialize or get the PluginApi
 *
 * This PluginApi, is the object with which the developer can control
 * things in the plugin, such as the extensible areas or the hooks
 *
 */
export abstract class BbbPluginSdk {
  /**
   * Method responsible for initializing the hooks use it from the plugin-side if you are using
   * one of the hooks, see complete list in the README.md
   *
   * @remarks
   * This method is part of the BbbPluginSdk abstract class.
   *
   * @param uuid - The UUID generated by the html5 in which the developer can get with
   * `document.currentScript?.getAttribute('uuid')` see any sample
   *
   */
  public static initialize(uuid: string) {
    const pluginApi: PluginApi = window.bbb_plugins[uuid];
    pluginApi.useCustomSubscription = ((
      query: string,
      variablesObjectWrapper?: CustomSubscriptionHookOptions,
    ) => useCustomSubscription(query, variablesObjectWrapper)) as UseCustomSubscriptionFunction;
    pluginApi.useCurrentPresentation = (
      () => useCurrentPresentation()) as UseCurrentPresentationFunction;
    pluginApi.useLoadedUserList = (() => useLoadedUserList()) as UseLoadedUserListFunction;
    pluginApi.useCurrentUser = (() => useCurrentUser()) as UseCurrentUserFunction;
    pluginApi.useUsersBasicInfo = (() => useUsersBasicInfo()) as UseUsersBasicInfoFunction;
    pluginApi.useUiEvent = (<
      T extends keyof EventPayloads
    >(
      eventName: T,
      callback: (payload: UiEventsHookEventWrapper<EventPayloads[T]>) => void,
    ) => useUiEvent(eventName, callback)) as UseUiEventFunction;
    pluginApi.uiCommands = uiCommands;
    const pluginName = pluginApi?.pluginName;
    if (pluginName) {
      pluginApi.useDataChannel = ((
        channelName: string,
      ) => useDataChannel(channelName, pluginName, window.bbb_plugins[uuid])
    ) as UseDataChannelFunctionFromPluginApi;
      pluginApi.usePluginSettings = () => usePluginSettings(pluginName);
    } else {
      throw new Error('Plugin name not set');
    }
  }

  /**
   * Returns the PluginApi. Use the PluginApi to access the hooks or setters functions for all the
   * extensible areas. For a complete list of those, see README.md
   *
   * @param uuid - The UUID generated by the html5 in which the developer can get with
   * `document.currentScript?.getAttribute('uuid')` see any sample.
   *
   * @param pluginName - The PluginName given by the html5 in which the developer can get with
   * `document.currentScript?.getAttribute('pluginName')` see any sample.
   *
   * @returns The PluginApi object
   *
   */
  public static getPluginApi(uuid: string, pluginName?: string): PluginApi {
    if (!window.bbb_plugins) window.bbb_plugins = {};
    if (Object.keys(window.bbb_plugins).indexOf(uuid) === -1) {
      window.bbb_plugins[uuid] = {
        setUserListDropdownItems: () => {},
        setPresentationToolbarItems: () => {},
        setActionButtonDropdownItems: () => {},
        setActionsBarItems: () => {},
        setAudioSettingsDropdownItems: () => {},
        setPresentationDropdownItems: () => {},
        setNavBarItems: () => {},
        setOptionsDropdownItems: () => {},
        setCameraSettingsDropdownItems: () => {},
        setUserCameraDropdownItems: () => {},
        setUserListItemAdditionalInformation: () => {},
        setFloatingWindows: () => {},
        mapOfDispatchers: {
          '': () => {},
        },
        getSessionToken: () => getSessionToken(),
        getJoinUrl: (params) => getJoinUrl(params),
        pluginName,
      };
    }

    return window.bbb_plugins[uuid];
  }
}
