# Sample Action Button Dropdown

## What is it?

The Sample Action Button Dropdown Plugin serves as a demonstration of how developers can create their own custom plugins. This plugin includes a separator after the ordinary actions menu options, a button that displays the label "Fetch presentation content" and another button that reads "Set different content in presentation area". When you click the first button, the menu will close and open a pop-up with the current presentation. And for the second button, the idea is to open a new content in the presentation area.

![Gif of plugin demo](./public/assets/plugin.gif)



## Running the Plugin from Source

1. Start the development server:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-action-button-dropdown-plugin
npm install
npm start
```

2. Add reference to it on BigBlueButton's `settings.yml`:

```yaml
  plugins:
    - name: SampleActionButtonDropdownPlugin
      url: http://127.0.0.1:4701/static/SampleActionButtonDropdownPlugin.js
```

## Building the Plugin

To build the plugin for production use, follow these steps:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-action-button-dropdown-plugin
npm install
npm run build-bundle
```

The above command will generate the `dist` folder, containing the bundled JavaScript file named `SampleActionButtonDropdownPlugin.js`. This file can be hosted on any HTTPS server.

To use the plugin with BigBlueButton, add the plugin's URL to `settings.yml` as shown below:

```yaml
public:
  app:
    ... // All app configurations
  plugins:
    - name: SampleActionButtonDropdownPlugin
      url: <<PLUGIN_URL>>
  ... // All other configurations
```

Alternatively, you can host the bundled file on the BigBlueButton server by copying `dist/SampleActionButtonDropdownPlugin.js` to the folder `/var/www/bigbluebutton-default/assets/plugins`. In this case, the `<<PLUGIN_URL>>` will be `https://<your-host>/plugins/SampleActionButtonDropdownPlugin.js`.
