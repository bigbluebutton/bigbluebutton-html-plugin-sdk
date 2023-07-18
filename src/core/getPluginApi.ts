import {
    PluginBrowserWindow,
    PluginApi,
} from '../types';

export type GetPluginApi = (uuid: string) => PluginApi

declare const window: PluginBrowserWindow
export const getPluginApi: GetPluginApi = (uuid: string) => {
    if (window.bbb_plugins){
        if (Object.keys(window.bbb_plugins).indexOf(uuid) !== -1) {
            return window.bbb_plugins[uuid];
        } else {
            window.bbb_plugins[uuid] =  {
                setWhiteboardToolbarItems: () => {},
            }
            return window.bbb_plugins[uuid];
        }
    } else {
        window.bbb_plugins = {};
        window.bbb_plugins[uuid] =  {
            setWhiteboardToolbarItems: () => {},
        }
        return window.bbb_plugins[uuid];
    }
    
} 
