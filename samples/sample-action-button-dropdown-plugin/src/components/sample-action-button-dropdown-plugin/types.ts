interface SampleActionButtonDropdownPluginProps {
    pluginName: string,
    pluginUuid: string,
}

interface IsMeetingBreakoutGraphqlResponse {
    meeting: {
        isBreakout: boolean;
    }[]
}

export { SampleActionButtonDropdownPluginProps, IsMeetingBreakoutGraphqlResponse };
