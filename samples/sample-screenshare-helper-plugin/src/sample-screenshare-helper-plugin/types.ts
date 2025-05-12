import { PluginApi } from 'bigbluebutton-html-plugin-sdk';

interface SampleUserCameraDropdownPluginProps {
    pluginApi: PluginApi,
    pluginUuid: string,
}

interface VideoStreamsSubscriptionResultType {
    user_camera?: {
        streamId: string
        user: {
          name: string
          userId: string
        };
    }[];
}

export { SampleUserCameraDropdownPluginProps, VideoStreamsSubscriptionResultType };
