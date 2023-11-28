import * as React from 'react';
import { useState, useEffect } from 'react';

import { BbbPluginSdk, NavBarButton, NavBarInfo, NavBarItemPosition, PluginApi } from 'bigbluebutton-html-plugin-sdk';
import { SampleNavBarPluginProps } from './types';

function SampleNavBarPlugin({ pluginUuid: uuid }: SampleNavBarPluginProps): React.ReactElement {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    const button = new NavBarButton({
      icon: "user",
      disabled: false,
      label: 'Click to send alert',
      tooltip: 'this is a button injected by plugin',
      position: NavBarItemPosition.RIGHT,
      onClick: () => {
        alert("Alert sent from plugin")
      },
      hasSeparator: true,
    });
    const info = new NavBarInfo({
      label: 'Information here',
      hasSeparator: true,
      position: NavBarItemPosition.CENTER,
    });
    pluginApi.setNavBarItems([button, info]);
  }, []);

  return null;
}

export default SampleNavBarPlugin;
