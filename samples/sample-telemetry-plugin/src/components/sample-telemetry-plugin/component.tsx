import * as React from 'react';
import { useEffect } from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  BbbPluginSdk,
  GenericContentSidekickArea,
  PluginApi,
  PluginErrorBoundary,
  pluginTelemetry,
} from 'bigbluebutton-html-plugin-sdk';
import { SampleTelemetryPluginProps } from './types';
import TelemetryPanel from '../telemetry-panel/component';

// Name every operation, prefixed with the plugin name: the client and the GraphQL middleware
// metrics then attribute it to this plugin instead of an anonymous operation
const MEETING_SUBSCRIPTION = `
  subscription SampleTelemetryPlugin_Meeting {
    meeting {
      name
    }
  }
`;

function SampleTelemetryPlugin(
  { pluginUuid: uuid }: SampleTelemetryPluginProps,
): React.ReactNode {
  BbbPluginSdk.initialize(uuid);
  const pluginApi: PluginApi = BbbPluginSdk.getPluginApi(uuid);

  // Only here to show the operation attributed to this plugin in the client telemetry
  pluginApi.useCustomSubscription(MEETING_SUBSCRIPTION);

  const users = pluginApi.useUsersBasicInfo();
  const userCount = users.data?.user.length;
  useEffect(() => {
    // A gauge keeps the last value: a quantity, never a list of names or ids
    if (userCount !== undefined) pluginTelemetry.gauge('users', userCount);
  }, [userCount]);

  useEffect(() => {
    pluginApi.setGenericContentItems([
      new GenericContentSidekickArea({
        id: 'sample-telemetry-panel',
        name: 'Telemetry sample',
        section: 'Samples',
        dataTest: 'sampleTelemetryPanelButton',
        buttonIcon: 'chat',
        open: false,
        contentFunction: (element: HTMLElement) => {
          const root = ReactDOM.createRoot(element);
          // The boundary reports render errors under this plugin's name, which the client cannot
          // do on its own when the plugin is served from another origin
          root.render(
            <PluginErrorBoundary
              fallback={<p data-test="sampleTelemetryFallback">The panel failed. The error was reported.</p>}
            >
              <TelemetryPanel />
            </PluginErrorBoundary>,
          );
          return root;
        },
      }),
    ]);
  }, []);

  return null;
}

export default SampleTelemetryPlugin;
