import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk, PluginApi, ActionButtonDropdownOption,
  RESET_DATA_CHANNEL, DataChannelTypes,
  pluginLogger,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleDataChannelPluginProps } from './types';

interface DataExampleType {
  first_example_field: number;
  second_example_field: string;
}

function SampleDataChannelPlugin(
  { pluginUuid: uuid }: SampleDataChannelPluginProps,
): React.ReactNode {
  BbbPluginSdk.initialize(uuid);
  // This Plugin only keeps track of a variable
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);
  const [dataResponseDefaultAllItems, pushEntryFunctionDefault, deleteEntryFunctionDefault] = pluginApi.useDataChannel<DataExampleType>('public-channel', DataChannelTypes.All_ITEMS);
  const [dataResponseDefaultLastItem] = pluginApi.useDataChannel<DataExampleType>('public-channel', DataChannelTypes.LATEST_ITEM);
  const [dataResponseNewSubChannel, pushToNewSubChannel, deleteEntryFunctionNewSubChannel] = pluginApi.useDataChannel<DataExampleType>('public-channel', DataChannelTypes.All_ITEMS, 'newSubChannel');

  useEffect(() => {
    pluginLogger.info('Log to verify the data flow: ', dataResponseDefaultAllItems, dataResponseDefaultLastItem, dataResponseNewSubChannel);
  }, [dataResponseDefaultAllItems, dataResponseNewSubChannel, dataResponseDefaultLastItem]);

  useEffect(() => {
    pluginApi.setActionButtonDropdownItems([]);
    pluginApi.setActionButtonDropdownItems([
      new ActionButtonDropdownOption({
        label: 'Click to increment data-channel',
        icon: 'user',
        tooltip: 'this is a button injected by plugin',
        allowed: true,
        onClick: () => {
          const currentValue = dataResponseDefaultAllItems.data
            && dataResponseDefaultAllItems.data.length > 0
            ? dataResponseDefaultAllItems.data[0].payloadJson.first_example_field : 0;
          const nextValue = currentValue + 1;
          if (pushEntryFunctionDefault) {
            pushEntryFunctionDefault({
              first_example_field: nextValue,
              second_example_field: 'string as an example',
            } as DataExampleType);
          }
          if (pushToNewSubChannel) {
            pushToNewSubChannel({
              first_example_field: currentValue,
              second_example_field: 'string as an example',
            } as DataExampleType);
          }
        },
      }), new ActionButtonDropdownOption({
        label: 'Click wipe data off data-channel',
        icon: 'user',
        tooltip: 'this is a button injected by plugin',
        allowed: true,
        onClick: () => {
          if (deleteEntryFunctionDefault) {
            deleteEntryFunctionDefault([RESET_DATA_CHANNEL]);
          }
          if (deleteEntryFunctionNewSubChannel) {
            deleteEntryFunctionNewSubChannel([RESET_DATA_CHANNEL]);
          }
        },
      }),
    ]);
  }, [
    dataResponseDefaultAllItems,
    pushEntryFunctionDefault,
    dataResponseNewSubChannel,
    pushEntryFunctionDefault,
  ]);
  return null;
}

export default SampleDataChannelPlugin;
