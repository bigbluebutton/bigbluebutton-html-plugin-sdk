import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk, NavBarButton, NavBarInfo, NavBarItemPosition, PluginApi,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleNavBarPluginProps } from './types';
import logger from '../utils/logger';

function SampleNavBarPlugin({ pluginUuid: uuid }: SampleNavBarPluginProps): React.ReactElement {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    const button = new NavBarButton({
      icon: 'user',
      disabled: false,
      label: 'This will log on the console',
      tooltip: 'this is a button injected by plugin',
      position: NavBarItemPosition.RIGHT,
      onClick: () => {
        logger.info('Log from nav bar plugin');
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
