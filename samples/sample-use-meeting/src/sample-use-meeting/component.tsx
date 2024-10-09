import * as React from 'react';
import { useEffect } from 'react';
import {
  BbbPluginSdk, PluginApi,
  pluginLogger,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleUseMeetingPluginProps } from './types';

function SampleUseMeetingPlugin({ pluginUuid: uuid }: SampleUseMeetingPluginProps):
React.ReactElement<SampleUseMeetingPluginProps> {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const meetingInfoGraphqlResponse = pluginApi.useMeeting();

  useEffect(() => {
    setInterval(() => {
      pluginLogger.info('persisting event');
      pluginApi.persistEvent('eventFromUseMeetingSample', { foo: 'bar' });
    }, 5000);
  }, []);
  useEffect(() => {
    const meetingInfo = meetingInfoGraphqlResponse?.data;
    pluginLogger.info('Showing meeting information ', meetingInfo);
  }, [meetingInfoGraphqlResponse]);
  return null;
}

export default SampleUseMeetingPlugin;
