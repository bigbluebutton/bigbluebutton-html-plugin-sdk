# Sample Action bar items Plugin

## What is it?

The Sample Action bar items Plugin serves as a demonstration of how developers can create their own custom plugins, in this case it goes into the actions bar. This plugin includes a separator and a button with a user icon that will log in the console user with the message "The action bar button from plugin was clicked".

![Gif of plugin demo](./public/assets/plugin.gif)

## Building the Plugin

To build the plugin for production use, follow these steps:

```bash
cd $HOME/src/plugin-pick-random-user-plugin
npm ci
npm run build-bundle
```

The above command will generate the `dist` folder, containing the bundled JavaScript file named `PickRandomUserPlugin.js`. This file can be hosted on any HTTPS server along with its `manifest.json`.

If you install the Plugin separated to the manifest, remember to change the `javascriptEntrypointUrl` in the `manifest.json` to the correct endpoint.

To use the plugin in BigBlueButton, send this parameter along in create call:

```
pluginManifests=[{"url":"<your-domain>/path/to/manifest.json"}]
```

Or additionally, you can add this same configuration in the `.properties` file from `bbb-web` in `/usr/share/bbb-web/WEB-INF/classes/bigbluebutton.properties`
