# Sample Options Dropdown

## What is it?

The Sample Options Dropdown Plugin serves as a demonstration of how developers can create their own custom plugins. This plugin includes a separator after an option with label "Send an alert popup". When you click on the button, the menu will close and open an alert pop-up.

![Gif of plugin demo](./public/assets/plugin.gif)

## Running the Plugin from Source

1. Start the development server:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-options-dropdown-plugin
npm install
npm start
```

2. Add reference to it on BigBlueButton's `settings.yml`:

```yaml
  plugins:
    - name: SampleOptionsDropdownPlugin
      url: http://127.0.0.1:4701/static/SampleOptionsDropdownPlugin.js
```

## Building the Plugin

To build the plugin for production use, follow these steps:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-options-dropdown-plugin
npm install
npm run build-bundle
```

The above command will generate the `dist` folder, containing the bundled JavaScript file named `SampleOptionsDropdownPlugin.js`. This file can be hosted on any HTTPS server.

To use the plugin with BigBlueButton, add the plugin's URL to `settings.yml` as shown below:

```yaml
public:
  app:
    ... // All app configurations
  plugins:
    - name: SampleOptionsDropdownPlugin
      url: <<PLUGIN_URL>>
  ... // All other configurations
```

Alternatively, you can host the bundled file on the BigBlueButton server by copying `dist/SampleOptionsDropdownPlugin.js` to the folder `/var/www/bigbluebutton-default/assets/plugins`. In this case, the `<<PLUGIN_URL>>` will be `https://<your-host>/plugins/SampleOptionsDropdownPlugin.js`.
