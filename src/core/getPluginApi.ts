import {
  PluginBrowserWindow,
} from '../types';

import {
  PluginApi, UseDataChannel, useDataChannel,
} from '../index';

type GetPluginApi = (uuid: string, pluginName?: string) => PluginApi

declare const window: PluginBrowserWindow;
const getPluginApi: GetPluginApi = (uuid: string, pluginName = undefined) => {
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
      dataChannelDispatchersMap: {
        '': () => {},
      },
    };
  }
  if (!pluginName) {
    const pluginNameSet = window.bbb_plugins[uuid].pluginName;
    if (pluginNameSet) {
      window.bbb_plugins[uuid].useDataChannel = ((
        channelName: string,
      ) => useDataChannel(channelName, pluginNameSet)) as UseDataChannel;
    }
  } else {
    window.bbb_plugins[uuid].pluginName = pluginName;
  }
  return window.bbb_plugins[uuid];
};

export {
  getPluginApi,
  GetPluginApi,
};
