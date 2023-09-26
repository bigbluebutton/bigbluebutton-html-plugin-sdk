import * as React from 'react';
import { useState, useEffect } from 'react';

import * as BbbPluginSdk from 'bigbluebutton-html-plugin-sdk';
import { SampleNavBarPluginProps } from './types';

function SampleNavBarPlugin({ pluginUuid: uuid }: SampleNavBarPluginProps): React.ReactElement {
  const pluginApi: BbbPluginSdk.PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    const button = new BbbPluginSdk.NavBarButton({
      icon: "user",
      disabled: false,
      label: 'Click to send alert',
      tooltip: 'this is a button injected by plugin',
      position: BbbPluginSdk.NavBarItemPosition.RIGHT,
      onClick: () => {
        alert("Alert sent from plugin")
      },
      hasSeparator: true,
    });
    const info = new BbbPluginSdk.NavBarInfo({
      icon: "user",
      disabled: false,
      label: 'Information here',
      hasSeparator: true,
      position: BbbPluginSdk.NavBarItemPosition.CENTER,
    });
    pluginApi.setNavBarItems([button, info]);
  }, []);

  return null;
}

export default SampleNavBarPlugin;
