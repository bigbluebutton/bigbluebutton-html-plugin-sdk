import * as React from 'react';

import {
  BbbPluginSdk, PluginApi,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleUseMeetingPluginProps } from './types';

function SampleUseMeetingPlugin({ pluginUuid: uuid }: SampleUseMeetingPluginProps):
React.ReactElement<SampleUseMeetingPluginProps> {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const meetingInfoGraphqlResponse = pluginApi.useMeeting();

  React.useEffect(() => {
    const meetingInfo = meetingInfoGraphqlResponse?.data;
    // TODO: Properly config logger;
    console.log('Showing meeting information ', meetingInfo);
  }, [meetingInfoGraphqlResponse]);
  return null;
}

export default SampleUseMeetingPlugin;
