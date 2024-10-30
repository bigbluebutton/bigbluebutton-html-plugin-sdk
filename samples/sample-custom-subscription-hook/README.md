# Sample Custom Hook Plugin

## What is it?

The Sample Custom Hook Plugin serves as a demonstration of how developers can create their own custom hooks. This plugin includes a button that displays the label "See preview of next slide". When you click on the button, a modal will open with a preview of the next slide. 

![Gif of plugin demo](./public/assets/plugin-hook-presentation.gif)

Another feature of this plugin is the log that appears in the console with the count of the users with the same name as the current user (self user).

![Gif of plugin demo](./public/assets/plugin-hook-user.gif)

See the **Usage** section of the main README to see how to build and run plugins.

## Building the Plugin

```bash
cd $HOME/src/sample-custom-subscription-hook
npm ci
npm run build-bundle
```

The above command will generate the `dist` folder, containing the bundled JavaScript file named `SampleCustomSubscriptionPlugin.js`. This file can be hosted on any HTTPS server along with its `manifest.json`.

If you install the Plugin separated to the manifest, remember to change the `javascriptEntrypointUrl` in the `manifest.json` to the correct endpoint.

To use the plugin in BigBlueButton, send this parameter along in create call:

```
pluginManifests=[{"url":"<your-domain>/path/to/manifest.json"}]
```

Or additionally, you can add this same configuration in the `.properties` file from `bbb-web` in `/usr/share/bbb-web/WEB-INF/classes/bigbluebutton.properties`
