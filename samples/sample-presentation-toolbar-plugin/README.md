# Sample Presentation Toolbar Plugin

## What is it?

The Sample Presentation Toolbar Plugin serves as a demonstration of how developers can create their own custom plugins. This plugin includes a button that displays the label "10s." When you click on the button, it transforms into a spinner and opens a modal window, providing information about the current presentation and its slide.

![Gif of plugin demo](./public/assets/plugin.gif)

See the **Usage** section of the main README to see how to build and run plugins.

## Building the Plugin
```bash
cd $HOME/src/sample-presentation-toolbar-plugin
npm ci
npm run build-bundle
```
The above command will generate the `dist` folder, containing the bundled JavaScript file named `SamplePresentationToolbarPlugin.js`. This file can be hosted on any HTTPS server along with its `manifest.json`.

If you install the Plugin separated to the manifest, remember to change the `javascriptEntrypointUrl` in the `manifest.json` to the correct endpoint.

To use the plugin in BigBlueButton, send this parameter along in create call:

```
pluginManifests=[{"url":"<your-domain>/path/to/manifest.json"}]
```

Or additionally, you can add this same configuration in the `.properties` file from `bbb-web` in `/usr/share/bbb-web/WEB-INF/classes/bigbluebutton.properties`
