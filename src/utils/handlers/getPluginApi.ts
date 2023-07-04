import {
    CustomWindowPlugin, GetWhiteboardToolbarItems,
} from '../../types';

declare const window: CustomWindowPlugin
export const getPluginApi = (uuid: string) => {
    if (window.bbb_plugins && uuid in Object.keys(window.bbb_plugins)) {
        return window.bbb_plugins[uuid];
    } else {
        window.bbb_plugins[uuid] =  {
            setWhiteboardToolbarItems: (callback: GetWhiteboardToolbarItems) => {},
        }
        return window.bbb_plugins[uuid];
    }
} 
