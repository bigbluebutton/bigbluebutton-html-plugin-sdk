import {
  PluginApi,
} from 'bigbluebutton-html-plugin-sdk';

interface SampleActionButtonDropdownPluginProps {
    pluginApi: PluginApi;
    pluginUuid: string;
}

interface IsMeetingBreakoutGraphqlResponse {
    meeting: {
        isBreakout: boolean;
    }[]
}

export { SampleActionButtonDropdownPluginProps, IsMeetingBreakoutGraphqlResponse };
