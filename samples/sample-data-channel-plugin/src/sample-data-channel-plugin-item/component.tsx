import * as React from 'react';
import { useEffect } from 'react';

import { BbbPluginSdk, PluginApi, ActionButtonDropdownOption, RESET_DATA_CHANNEL } from 'bigbluebutton-html-plugin-sdk';
import { SampleDataChannelPluginProps } from './types';
import { DataChannelTypes } from 'bigbluebutton-html-plugin-sdk/dist/cjs/data-channel/enums';

interface DataExampleType {
  first_example_field: number;
  second_example_field: string;
}

function SampleDataChannelPlugin(
  { pluginUuid: uuid }: SampleDataChannelPluginProps
): React.ReactNode {
  BbbPluginSdk.initialize(uuid);
  // This Plugin only keeps track of a variable
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [dataResultDefaultAllItems, dispatcherDefault, deleteFunctionDefault] = pluginApi.useDataChannel<DataExampleType>('public-channel', DataChannelTypes.All_ITEMS);
  const [ dataResultDefaultLastItem ] = pluginApi.useDataChannel<DataExampleType>('public-channel', DataChannelTypes.LATEST_ITEM);
  const [dataResultNewSubChannel, dispatcherNewSubChannel, deleteFunctionNewSubChannel] = pluginApi.useDataChannel<DataExampleType>('public-channel', DataChannelTypes.All_ITEMS, 'newSubChannel');

  useEffect(() => {
    console.log("Log to verify the data flow and the dispatcher: ", dataResultDefaultAllItems, dataResultDefaultLastItem, dataResultNewSubChannel);
  }, [dataResultDefaultAllItems, dataResultNewSubChannel, dataResultDefaultLastItem]);
  

  useEffect(() => {
    pluginApi.setActionButtonDropdownItems([])
    pluginApi.setActionButtonDropdownItems([
      new ActionButtonDropdownOption({
        label: 'Click to increment data-channel',
        icon: 'user',
        tooltip: 'this is a button injected by plugin',
        allowed: true,
        onClick: () => {
          const currentValue = dataResultDefaultAllItems.data && dataResultDefaultAllItems.data.length > 0 ? dataResultDefaultAllItems.data[0].payloadJson.first_example_field : 0;
          const nextValue = currentValue + 1;
          if (dispatcherDefault) dispatcherDefault({
            first_example_field: nextValue,
            second_example_field: 'string as an example',
            } as DataExampleType);
          if (dispatcherNewSubChannel) dispatcherNewSubChannel({
              first_example_field: currentValue,
              second_example_field: 'string as an example',
            } as DataExampleType);
        },
      }), new ActionButtonDropdownOption({
        label: 'Click wipe data off data-channel',
        icon: 'user',
        tooltip: 'this is a button injected by plugin',
        allowed: true,
        onClick: () => {
          if (deleteFunctionDefault) {
            deleteFunctionDefault([RESET_DATA_CHANNEL]);
          }
          if (deleteFunctionNewSubChannel) {
            deleteFunctionNewSubChannel([RESET_DATA_CHANNEL]);
          }
        },
      }),
    ])
  }, [dataResultDefaultAllItems, dispatcherDefault, dataResultNewSubChannel, dispatcherDefault]);
  return null;
}

export default SampleDataChannelPlugin;
 


