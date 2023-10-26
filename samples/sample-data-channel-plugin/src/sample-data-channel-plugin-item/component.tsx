import * as React from 'react';
import { useEffect } from 'react';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';
import { SampleDataChannelPluginProps } from './types';
function SampleDataChannelPlugin(
  { pluginUuid: uuid, pluginName }: SampleDataChannelPluginProps
): React.ReactNode {
  const pluginApi: BbbPluginSdk.PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [data, dispatcher] = pluginApi.useDataChannel('selectRandomUser');

  useEffect(() => {
    console.log("Log to verify the data flow and the dispatcher: ", data, dispatcher)
  }, [data, dispatcher])
  

  useEffect(() => {
    if (dispatcher) dispatcher({
      first_example_field: 1234,
      second_example_field: 'string as an example',
    }, [
      {
        role: BbbPluginSdk.Roles.MODERATOR
      } as BbbPluginSdk.ToRole,
      {
        userId: 'userId-123'
      } as BbbPluginSdk.ToUserId,
    ]);
  }, [dispatcher])

  console.log()
  return null;
}

export default SampleDataChannelPlugin;
 


