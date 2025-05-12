import * as React from 'react';
import { useEffect } from 'react';
import {
  BbbPluginSdk,
  pluginLogger,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleUseMeetingPluginProps } from './types';

function SampleUseMeetingPlugin({ pluginUuid: uuid, pluginApi }: SampleUseMeetingPluginProps):
React.ReactElement<SampleUseMeetingPluginProps> {
  BbbPluginSdk.initialize(pluginApi, uuid);
  const meetingInfoGraphqlResponse = pluginApi.useMeeting();

  useEffect(() => {
    const meetingInfo = meetingInfoGraphqlResponse?.data;
    pluginLogger.info('Showing meeting information ', meetingInfo);
  }, [meetingInfoGraphqlResponse]);
  return null;
}

export default SampleUseMeetingPlugin;
