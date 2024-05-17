import * as React from 'react';
import { useEffect } from 'react';

import {
  BbbPluginSdk,
  PluginApi,
  pluginLogger,
  PresentationDropdownInterface,
  PresentationDropdownOption,
  PresentationDropdownSeparator,
} from 'bigbluebutton-html-plugin-sdk';
import { SamplePresentationDropdownPluginProps } from './types';

function SamplePresentationDropdownPlugin(
  { pluginUuid: uuid }: SamplePresentationDropdownPluginProps,
): React.ReactElement<SamplePresentationDropdownPluginProps> {
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  useEffect(() => {
    const presentationDropdownOption:
      PresentationDropdownInterface = new PresentationDropdownOption({
        label: 'This will log on the console',
        icon: 'user',
        onClick: () => {
          pluginLogger.info('Log from presentation dropdown plugins');
        },
      });

    const presentationDropdownSeparator:
      PresentationDropdownInterface = new PresentationDropdownSeparator();
    pluginApi.setPresentationDropdownItems(
      [presentationDropdownSeparator, presentationDropdownOption],
    );
  }, []);

  return null;
}

export default SamplePresentationDropdownPlugin;
