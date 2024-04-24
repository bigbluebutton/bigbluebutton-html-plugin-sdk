# Sample Custom Hook Plugin

## What is it?

The Sample Custom Hook Plugin serves as a demonstration of how developers can create their own custom hooks. This plugin includes a button that displays the label "See preview of next slide". When you click on the button, a modal will open with a preview of the next slide. 

![Gif of plugin demo](./public/assets/plugin-hook-presentation.gif)

Another feature of this plugin is the log that appears in the console with the count of the users with the same name as the current user (self user).

![Gif of plugin demo](./public/assets/plugin-hook-user.gif)

## Running the Plugin from Source

1. Start the development server:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-custom-subscription-plugin
npm install
npm start
```

2. Add reference to it on BigBlueButton's `settings.yml`:

```yaml
  plugins:
    - name: SampleCustomSubscriptionPlugin
      url: http://127.0.0.1:4701/static/SampleCustomSubscriptionPlugin.js
```

## Building the Plugin

To build the plugin for production use, follow these steps:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-custom-subscription-plugin
npm install
npm run build-bundle
```

The above command will generate the `dist` folder, containing the bundled JavaScript file named `SampleCustomSubscriptionPlugin.js`. This file can be hosted on any HTTPS server.

To use the plugin with BigBlueButton, add the plugin's URL to `settings.yml` as shown below:

```yaml
public:
  app:
    ... // All app configurations
  plugins:
    - name: sampleCustomSubscriptionPlugin
      url: <<PLUGIN_URL>>
  ... // All other configurations
```

Alternatively, you can host the bundled file on the BigBlueButton server by copying `dist/SampleCustomSubscriptionPlugin.js` to the folder `/var/www/bigbluebutton-default/assets/plugins`. In this case, the `<<PLUGIN_URL>>` will be `https://<your-host>/plugins/SampleCustomSubscriptionPlugin.js`.
