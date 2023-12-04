import * as React from 'react';
import { useEffect } from 'react';

import { BbbPluginSdk, PluginApi, DataChannelDispatcherUserRole, ToRole, ToUserId } from 'bigbluebutton-html-plugin-sdk';
import { SampleDataChannelPluginProps } from './types';

interface DataExampleType {
  first_example_field: number;
  second_example_field: string;
}

function SampleDataChannelPlugin(
  { pluginUuid: uuid }: SampleDataChannelPluginProps
): React.ReactNode {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [data, dispatcher] = pluginApi.useDataChannel<DataExampleType>('selectRandomUser');

  useEffect(() => {
    console.log("Log to verify the data flow and the dispatcher: ", data, dispatcher)
  }, [data, dispatcher]);
  

  useEffect(() => {
    if (dispatcher) dispatcher({
      first_example_field: 1234,
      second_example_field: 'string as an example',
    } as DataExampleType, [
      {
        role: DataChannelDispatcherUserRole.MODERATOR
      } as ToRole,
      {
        userId: 'userId-123'
      } as ToUserId,
    ]);
  }, [dispatcher]);

  return null;
}

export default SampleDataChannelPlugin;
 


