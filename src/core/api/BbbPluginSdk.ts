/* eslint-disable no-console */
import { useEffect } from 'react';
import useShouldUnmountPlugin from '../auxiliary/plugin-unmount/hook';
import { UseLoadedUserListFunction } from '../../data-consumption/domain/users/loaded-user-list/types';
import { UseCurrentUserFunction } from '../../data-consumption/domain/users/current-user/types';
import {
  UseCurrentPresentationFunction,
} from '../../data-consumption/domain/presentations/current-presentation/types';
import { UseUsersBasicInfoFunction } from '../../data-consumption/domain/users/users-basic-info/types';
import { DataChannelTypes } from '../../data-channel/enums';
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
import { useDataChannelGeneral } from '../../data-channel/hooks';
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
import { UseLoadedChatMessagesFunction } from '../../data-consumption/domain/chat/loaded-chat-messages/types';
import { useLoadedChatMessages } from '../../data-consumption/domain/chat/loaded-chat-messages/hooks';
import { useChatMessageDomElements } from '../../dom-element-manipulation/chat/message/hooks';
import { useUserCameraDomElements } from '../../dom-element-manipulation/user-camera/hooks';
import { UseTalkingIndicatorFunction } from '../../data-consumption/domain/user-voice/talking-indicator/types';
import { useTalkingIndicator } from '../../data-consumption/domain/user-voice/talking-indicator/hooks';
import { useUiData } from '../../ui-data-hooks/hooks';
import { UseMeetingFunction } from '../../data-consumption/domain/meeting/from-core/types';
import { useMeeting } from '../../data-consumption/domain/meeting/from-core/hooks';
import { serverCommands } from '../../server-commands/commands';
import { sendGenericDataForLearningAnalyticsDashboard } from '../../learning-analytics-dashboard/hooks';
import { GenericDataForLearningAnalyticsDashboard } from '../../learning-analytics-dashboard/types';
import { getRemoteData } from '../../remote-data/utils';
import { persistEventFunctionWrapper } from '../../event-persistence/hooks';
import useLocaleMessagesAuxiliary from '../auxiliary/plugin-information/locale-messages/useLocaleMessages';

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
    if (!this.isReactEnvironment()) throw new Error('Initializing pluginApi outside of a react function component. It should be done inside');
    const pluginApi: PluginApi = window.bbb_plugins[uuid];
    pluginApi.useCustomSubscription = ((
      query: string,
      variablesObjectWrapper?: CustomSubscriptionHookOptions,
    ) => useCustomSubscription(query, variablesObjectWrapper)) as UseCustomSubscriptionFunction;
    pluginApi.useCurrentPresentation = (
      () => useCurrentPresentation()) as UseCurrentPresentationFunction;
    pluginApi.useLoadedUserList = (() => useLoadedUserList()) as UseLoadedUserListFunction;
    pluginApi.useCurrentUser = (() => useCurrentUser()) as UseCurrentUserFunction;
    pluginApi.useMeeting = (() => useMeeting()) as UseMeetingFunction;
    pluginApi.useUsersBasicInfo = (() => useUsersBasicInfo()) as UseUsersBasicInfoFunction;
    pluginApi.useTalkingIndicator = (() => useTalkingIndicator()) as UseTalkingIndicatorFunction;
    pluginApi.getJoinUrl = (params) => getJoinUrl(params);
    pluginApi.useLoadedChatMessages = (
      () => useLoadedChatMessages()) as UseLoadedChatMessagesFunction;
    pluginApi.useChatMessageDomElements = (
      messageIds: string[],
    ) => useChatMessageDomElements(messageIds, uuid);
    pluginApi.useUserCameraDomElements = (
      streamIds: string[],
    ) => useUserCameraDomElements(streamIds, uuid);
    pluginApi.uiCommands = uiCommands;
    pluginApi.useUiData = useUiData;
    const pluginName = pluginApi?.pluginName;
    pluginApi.useShouldUnmountPlugin = useShouldUnmountPlugin;
    if (pluginName) {
      pluginApi.useDataChannel = ((
        channelName: string,
        dataChannelType: DataChannelTypes = DataChannelTypes.All_ITEMS,
        subChannelName: string = 'default',
      ) => useDataChannelGeneral(
        channelName,
        subChannelName,
        pluginName,
        window.bbb_plugins[uuid],
        dataChannelType,
      )) as UseDataChannelFunctionFromPluginApi;
      pluginApi.usePluginSettings = () => usePluginSettings(pluginName);
      pluginApi.serverCommands = serverCommands(pluginName);
      pluginApi.sendGenericDataForLearningAnalyticsDashboard = (
        data: GenericDataForLearningAnalyticsDashboard,
      ) => sendGenericDataForLearningAnalyticsDashboard(data, pluginName);
      pluginApi.getRemoteData = (
        dataSourceName: string,
      ) => getRemoteData(dataSourceName, pluginName);
      pluginApi.persistEvent = <T=object>(
        eventName: string,
        payload: T,
      ) => persistEventFunctionWrapper(
          pluginName,
          eventName,
          payload,
        );
      pluginApi.useLocaleMessages = (
        fetchConfigs?: RequestInit,
      ) => useLocaleMessagesAuxiliary({ pluginApi, fetchConfigs });
    } else {
      throw new Error('Plugin name not set');
    }
  }

  private static isReactEnvironment(): boolean {
    const fn = console.error;
    try {
      console.error = () => {};
      useEffect(() => {}, []);
    } catch {
      console.error = fn;
      console.error('[PLUGIN-ERROR] Error: Initializing pluginApi outside of a react function component. It should be done inside');
      return false;
    }
    console.error = fn;
    return true;
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
        setUserListDropdownItems: () => [],
        setPresentationToolbarItems: () => [],
        setActionButtonDropdownItems: () => [],
        setActionsBarItems: () => [],
        setAudioSettingsDropdownItems: () => [],
        setAppsGalleryItems: () => [],
        setPresentationDropdownItems: () => [],
        setNavBarItems: () => [],
        setScreenshareHelperItems: () => [],
        setUserCameraHelperItems: () => [],
        setOptionsDropdownItems: () => [],
        setCameraSettingsDropdownItems: () => [],
        setUserCameraDropdownItems: () => [],
        setUserListItemAdditionalInformation: () => [],
        setFloatingWindows: () => [],
        setGenericContentItems: () => [],
        mapOfPushEntryFunctions: {
          '': () => {},
        },
        getSessionToken: () => getSessionToken(),
        pluginName,
      };
    }

    return window.bbb_plugins[uuid];
  }
}
