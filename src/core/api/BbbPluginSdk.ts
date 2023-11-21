import { UseLoadedUserList } from 'src/data-consumption/domain/users/loaded-user-list/types';
import { UseCurrentUser } from 'src/data-consumption/domain/users/current-user/types';
import {
  UseDataChannel, useDataChannel,
  UseCurrentPresentation,
  useCurrentPresentation, useLoadedUserList, UseUsersBasicInfo, useUsersBasicInfo,
  useCurrentUser, useCustomSubscription, UseCustomSubscription, VariablesObjectWrapper,
} from '../../index';

import {
  PluginApi,
  PluginBrowserWindow,
} from './types';

declare const window: PluginBrowserWindow;

export abstract class BbbPluginSdk {
  public static initialize(uuid: string) {
    const pluginApi: PluginApi = window.bbb_plugins[uuid];
    pluginApi.useCustomSubscription = ((
      query: string,
      variablesObjectWrapper?: VariablesObjectWrapper,
    ) => useCustomSubscription(query, variablesObjectWrapper)) as UseCustomSubscription;
    pluginApi.useCurrentPresentation = (() => useCurrentPresentation()) as UseCurrentPresentation;
    pluginApi.useLoadedUserList = (() => useLoadedUserList()) as UseLoadedUserList;
    pluginApi.useCurrentUser = (() => useCurrentUser()) as UseCurrentUser;
    pluginApi.useUsersBasicInfo = (() => useUsersBasicInfo()) as UseUsersBasicInfo;
    const pluginName = pluginApi?.pluginName;
    if (pluginName) {
      pluginApi.useDataChannel = ((
        channelName: string,
      ) => useDataChannel(channelName, pluginName, window.bbb_plugins[uuid])) as UseDataChannel;
    } else {
      throw new Error('Plugin name not set');
    }
  }

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
        mapOfDispatchers: {
          '': () => {},
        },
        pluginName,
      };
    }

    return window.bbb_plugins[uuid];
  }
}
