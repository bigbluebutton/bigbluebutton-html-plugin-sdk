import { PluginApi } from 'bigbluebutton-html-plugin-sdk';

interface SampleServerCommandsPluginProps {
    pluginApi: PluginApi,
    pluginName: string,
    pluginUuid: string,
}

interface Message {
    messageId: string;
    text: string;
}

export { SampleServerCommandsPluginProps, Message };
