interface SampleUserCameraDropdownPluginProps {
    pluginName: string,
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
