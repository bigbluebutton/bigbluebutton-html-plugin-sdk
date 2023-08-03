# Sample Whiteboard Toolbar Plugin

## What is it?

The Sample Whiteboard Toolbar Plugin serves as a demonstration of how developers can create their own custom plugins. This plugin includes a button that displays the label "10s." When you click on the button, it transforms into a spinner and opens a modal window, providing information about the current presentation and its slide.

![Alt Text](./public/assets/plugin.gif)

## Running the Plugin from Source

1. Start the development server:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-whiteboard-toolbar-plugin
npm install
npm start
```

2. Add reference to it on BigBlueButton's `settings.yml`:

```yaml
  plugins:
    - name: SampleWhiteboardToolbarPlugin
      url: http://localhost:8080/static/SampleWhiteboardToolbarPlugin.js
```

## Building the Plugin

To build the plugin for production use, follow these steps:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-whiteboard-toolbar-plugin
npm install
npm run build-bundle
```

The above command will generate the `dist` folder, containing the bundled JavaScript file named `SampleWhiteboardToolbarPlugin.js`. This file can be hosted on any HTTPS server.

To use the plugin with BigBlueButton, add the plugin's URL to `settings.yml` as shown below:

```yaml
public:
  app:
    ... // All app configurations
  plugins:
    - name: sampleWhiteboardToolbarPlugin
      url: <<PLUGIN_URL>>
  ... // All other configurations
```

Alternatively, you can host the bundled file on the BigBlueButton server by copying `dist/SampleWhiteboardToolbarPlugin.js` to the folder `/var/www/bigbluebutton-default/assets/plugins`. In this case, the `<<PLUGIN_URL>>` will be `https://<your-host>/plugins/SampleWhiteboardToolbarPlugin.js`.
