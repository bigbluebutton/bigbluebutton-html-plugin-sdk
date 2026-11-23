# Sample Telemetry Plugin

## What is it?

A plugin that uses the performance telemetry API of the SDK. It adds a "Telemetry sample" panel
(listed in the apps gallery) with buttons that:

- measure an async task with `pluginTelemetry.measure` (300 ms);
- measure a blocking task with `pluginTelemetry.start(...).end()` (80 ms);
- throw a render error inside `PluginErrorBoundary`, which reports it and shows a fallback.

It also keeps a `users` gauge with the number of users in the meeting, marks each button action in
the client's repro trail, and runs a named custom subscription (`SampleTelemetryPlugin_Meeting`) that
the client attributes to the plugin.

With client telemetry on, the results show up in the debug window (Performance → Plugins) and in the
client's OTLP export as `bbb.client.plugin.duration{bbb.plugin.phase="measure"}`,
`bbb.client.plugin.gauge` and `bbb.client.plugin.errors`. With telemetry off every call is a no-op and
the panel says so.

See the **Usage** section of the main README to see how to build and run plugins.

## Building the Plugin

```bash
cd $HOME/src/sample-telemetry-plugin
npm ci
npm run build-bundle
```

`pluginTelemetry` and `PluginErrorBoundary` first ship in the SDK release after `1.0.0-beta.3`. Until
it is on npm, copy this repository's SDK into the sample after `npm ci`: run `npm ci && npm run build`
at the repository root, then `./scripts/publish-to-project-folder.sh samples/sample-telemetry-plugin`.

The above command generates the `dist` folder with `SampleTelemetryPlugin.js` and its
`manifest.json`. To use the plugin in BigBlueButton, send this parameter along in the create call:

```
pluginManifests=[{"url":"<your-domain>/path/to/manifest.json"}]
```
