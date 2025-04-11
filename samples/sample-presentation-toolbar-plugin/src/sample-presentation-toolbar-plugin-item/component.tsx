import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk,
  pluginLogger,
  PresentationToolbarButton,
} from 'bigbluebutton-html-plugin-sdk/';
import { SamplePresentationToolbarPluginProps } from './types';

function SamplePresentationToolbarPlugin(
  { pluginUuid: uuid, pluginApi }: SamplePresentationToolbarPluginProps,
): React.ReactElement<SamplePresentationToolbarPluginProps> {
  BbbPluginSdk.initialize(pluginApi, uuid);

  useEffect(() => {
    const currentObjectToSendToClient = new PresentationToolbarButton({
      label: 'Click to log in the console',
      tooltip: 'this is a button injected by plugin',
      style: {},
      onClick: () => {
        pluginLogger.info('Log from sample-presentation-toolbar-plugin');
      },
    });
    pluginApi.setPresentationToolbarItems([currentObjectToSendToClient]);
  }, []);

  return null;
}

export default SamplePresentationToolbarPlugin;
