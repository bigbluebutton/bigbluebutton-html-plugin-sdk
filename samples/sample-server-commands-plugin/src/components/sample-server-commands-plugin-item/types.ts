interface SampleServerCommandsPluginProps {
    pluginName: string,
    pluginUuid: string,
}

interface Message {
    messageId: string;
    text: string;
}

export { SampleServerCommandsPluginProps, Message };
