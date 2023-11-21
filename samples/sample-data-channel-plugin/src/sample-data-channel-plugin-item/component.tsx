import * as React from 'react';
import { useEffect } from 'react';

import { BbbPluginSdk, PluginApi, Role, ToRole, ToUserId } from 'bigbluebutton-html-plugin-sdk';
import { SampleDataChannelPluginProps } from './types';
function SampleDataChannelPlugin(
  { pluginUuid: uuid }: SampleDataChannelPluginProps
): React.ReactNode {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [data, dispatcher] = pluginApi.useDataChannel('selectRandomUser');

  useEffect(() => {
    console.log("Log to verify the data flow and the dispatcher: ", data, dispatcher)
  }, [data, dispatcher]);
  

  useEffect(() => {
    if (dispatcher) dispatcher({
      first_example_field: 1234,
      second_example_field: 'string as an example',
    }, [
      {
        role: Role.MODERATOR
      } as ToRole,
      {
        userId: 'userId-123'
      } as ToUserId,
    ]);
  }, [dispatcher]);

  return null;
}

export default SampleDataChannelPlugin;
 


