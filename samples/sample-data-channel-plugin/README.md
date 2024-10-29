# Sample Data Channel

## What is it?

The Sample Data Channel Plugin serves as a demonstration of how developers can create their own custom plugins. This plugin creates the data channel called `selectRandomUser`, which needs to be properly configured in the client configuration (the override file in which akka can also access, such as `/etc/bigbluebutton/bbb-html5.yml`).

See the **Usage** section of the main README to see how to build and run plugins.

## Building the Plugin

```bash
cd $HOME/src/sample-data-channel-plugin
npm ci
npm run build-bundle
```

The above command will generate the `dist` folder, containing the bundled JavaScript file named `SampleDataChannelPlugin.js`. This file can be hosted on any HTTPS server along with its `manifest.json`.

If you install the Plugin separated to the manifest, remember to change the `javascriptEntrypointUrl` in the `manifest.json` to the correct endpoint.

To use the plugin in BigBlueButton, send this parameter along in create call:

```
pluginManifests=[{"url":"<your-domain>/path/to/manifest.json"}]
```

Or additionally, you can add this same configuration in the `.properties` file from `bbb-web` in `/usr/share/bbb-web/WEB-INF/classes/bigbluebutton.properties`
