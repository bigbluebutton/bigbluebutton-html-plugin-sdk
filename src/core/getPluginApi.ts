import {
  PluginBrowserWindow,
  PluginApi,
} from '../types';

type GetPluginApi = (uuid: string) => PluginApi

declare const window: PluginBrowserWindow;
const getPluginApi: GetPluginApi = (uuid: string) => {
  if (window.bbb_plugins) {
    if (Object.keys(window.bbb_plugins).indexOf(uuid) !== -1) {
      return window.bbb_plugins[uuid];
    }
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
    };
    return window.bbb_plugins[uuid];
  }
  window.bbb_plugins = {};
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
  };
  return window.bbb_plugins[uuid];
};

export {
  getPluginApi,
  GetPluginApi,
};
