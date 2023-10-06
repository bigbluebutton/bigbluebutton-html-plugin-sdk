# Sample User List Item Additional Information Plugin

## What is it?

The Sample User List Item Additional Information Plugin serves as a demonstration of how developers can create their own custom plugins, in this case each participant will have a sort of warning badge right on the user's name side. See example below

![Gif of plugin demo](./public/assets/plugin.png)

## Running the Plugin from Source

1. Start the development server:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-user-list-icon-plugin
npm install
npm start
```

2. Add reference to it on BigBlueButton's `settings.yml`:

```yaml
  plugins:
    - name: SampleUserListItemAdditionalInformationPlugin
      url: http://127.0.0.1:4701/static/SampleUserListItemAdditionalInformationPlugin.js
```

## Building the Plugin

To build the plugin for production use, follow these steps:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-user-list-icon-plugin
npm install
npm run build-bundle
```

The above command will generate the `dist` folder, containing the bundled JavaScript file named `SampleUserListItemAdditionalInformationPlugin.js`. This file can be hosted on any HTTPS server.

To use the plugin with BigBlueButton, add the plugin's URL to `settings.yml` as shown below:

```yaml
public:
  app:
    ... // All app configurations
  plugins:
    - name: SampleUserListItemAdditionalInformationPlugin
      url: <<PLUGIN_URL>>
  ... // All other configurations
```

Alternatively, you can host the bundled file on the BigBlueButton server by copying `dist/SampleUserListItemAdditionalInformationPlugin.js` to the folder `/var/www/bigbluebutton-default/assets/plugins`. In this case, the `<<PLUGIN_URL>>` will be `https://<your-host>/plugins/SampleUserListItemAdditionalInformationPlugin.js`.
