import * as React from 'react';
import { useEffect } from 'react';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';
import { SampleActionBarItemPluginProps } from './types';

function SampleActionBarItemPlugin({
  pluginUuid: uuid,
}: SampleActionBarItemPluginProps): React.ReactNode {
  const pluginApi: BbbPluginSdk.PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    const buttonToUserListItem:
          BbbPluginSdk.ActionBarItem = new BbbPluginSdk.ActionBarButton({
            icon: 'user',
            tooltip: 'This will make an alert dialog',
            allowed: true,
            onClick: () => {
              alert("The action bar button from plugin was clicked")
            },
            hasDropdownButton: false,
            listOfDropdownItems: [],
            position: BbbPluginSdk.ActionBarPosition.RIGHT,
          });
    const dropdownToUserListItem:
      BbbPluginSdk.ActionBarItem = new BbbPluginSdk.ActionBarSeparator({
          position: BbbPluginSdk.ActionBarPosition.RIGHT,
        });
    
    pluginApi.setActionBarItems([dropdownToUserListItem, buttonToUserListItem]);
  }, []);

  return null;
}

export default SampleActionBarItemPlugin;
