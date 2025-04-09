import * as React from 'react';
import { useEffect } from 'react';

import {
  NavBarButton, NavBarInfo, NavBarItemPosition,
  pluginLogger,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleNavBarPluginProps } from './types';

function SampleNavBarPlugin({ pluginApi }: SampleNavBarPluginProps): React.ReactElement {
  useEffect(() => {
    const button = new NavBarButton({
      icon: 'user',
      disabled: false,
      label: 'This will log on the console',
      tooltip: 'this is a button injected by plugin',
      position: NavBarItemPosition.RIGHT,
      onClick: () => {
        pluginLogger.info('Log from nav bar plugin');
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
