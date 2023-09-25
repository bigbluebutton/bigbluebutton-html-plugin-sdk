# Sample Camera Settings Dropdown

## What is it?

The Sample Camera Settings Dropdown Plugin serves as a demonstration of how developers can create their own custom plugins. This plugin includes a separator after the ordinary actions menu options and a button that displays the label "Send alert from plugin". When you click on the button, it will open an alert with a message, and then close the menu dropdown.

![Gif of plugin demo](./public/assets/plugin.gif)

## Running the Plugin from Source

1. Start the development server:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-camera-settings-dropdown-plugin
npm install
npm start
```

2. Add reference to it on BigBlueButton's `settings.yml`:

```yaml
  plugins:
    - name: SampleCameraSettingsDropdownPlugin
      url: http://127.0.0.1:4701/static/SampleCameraSettingsDropdownPlugin.js
```

## Building the Plugin

To build the plugin for production use, follow these steps:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-camera-settings-dropdown-plugin
npm install
npm run build-bundle
```

The above command will generate the `dist` folder, containing the bundled JavaScript file named `SampleCameraSettingsDropdownPlugin.js`. This file can be hosted on any HTTPS server.

To use the plugin with BigBlueButton, add the plugin's URL to `settings.yml` as shown below:

```yaml
public:
  app:
    ... // All app configurations
  plugins:
    - name: SampleCameraSettingsDropdownPlugin
      url: <<PLUGIN_URL>>
  ... // All other configurations
```

Alternatively, you can host the bundled file on the BigBlueButton server by copying `dist/SampleCameraSettingsDropdownPlugin.js` to the folder `/var/www/bigbluebutton-default/assets/plugins`. In this case, the `<<PLUGIN_URL>>` will be `https://<your-host>/plugins/SampleCameraSettingsDropdownPlugin.js`.
