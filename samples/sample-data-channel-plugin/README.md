# Sample Data Channel

## What is it?

The Sample Data Channel Plugin serves as a demonstration of how developers can create their own custom plugins. This plugin creates the data channel called `selectRandomUser`, which needs to be properly configured in the client configuration (the override file in which akka can also access, such as `/etc/bigbluebutton/bbb-html5.yml`).

## Running the Plugin from Source

1. Start the development server:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-data-channel-plugin
npm install
npm start
```

2. Add reference to it on BigBlueButton's `settings.yml`:

```yaml
  plugins:
    - name: SampleDataChannelPlugin
      url: http://127.0.0.1:4701/static/SampleDataChannelPlugin.js
      dataChannels:
        - name: public-channel
          writePermission: ['moderator','presenter']
          deletePermission:
              - moderator
              - sender
```

Mind that for this Plugin there is also a special configuration to insert in this file, which is the data-channels part, see example below:

```yaml
  plugins:
    - name: SampleDataChannelPlugin
      url: http://<your-hosted-plugin>/SampleDataChannelPlugin.js
      dataChannels:
        - name: public-channel
          writePermission: ['moderator','presenter']
          deletePermission:
              - moderator
              - sender
```

With the config above, you can also have another data-channel called `public-channel`.

## Building the Plugin

To build the plugin for production use, follow these steps:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-data-channel-plugin
npm install
npm run build-bundle
```

The above command will generate the `dist` folder, containing the bundled JavaScript file named `SampleDataChannelPlugin.js`. This file can be hosted on any HTTPS server.

To use the plugin with BigBlueButton, add the plugin's URL to `settings.yml` as shown below:

```yaml
public:
  app:
    ... // All app configurations
  plugins:
    - name: SampleDataChannelPlugin
      url: <<PLUGIN_URL>>
  ... // All other configurations
```

Alternatively, you can host the bundled file on the BigBlueButton server by copying `dist/SampleDataChannelPlugin.js` to the folder `/var/www/bigbluebutton-default/assets/plugins`. In this case, the `<<PLUGIN_URL>>` will be `https://<your-host>/plugins/SampleDataChannelPlugin.js`.
