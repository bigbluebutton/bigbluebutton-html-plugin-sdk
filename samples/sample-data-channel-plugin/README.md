# Sample Data Channel

## What is it?

The Sample Data Channel Plugin serves as a demonstration of how developers can create their own custom plugins. This plugin creates the data channel called `selectRandomUser`, which needs to be properly configured in the client configuration (the override file in which akka can also access, such as `/etc/bigbluebutton/bbb-html5.yml`).

See the **Usage** section of the main README to see how to build and run plugins.

## Configuration Example

*Mind that for this plugin you also need to configure the data-channels.*
Add this to the `settings.yml` of the BBB HTML5-client:

```yaml
public:
  plugins:
    - name: SampleDataChannelPlugin
      url: <<PLUGIN_URL>>
      dataChannels:
        - name: public-channel
          pushPermission: ['moderator','presenter']
          replaceOrDeletePermission:
              - moderator
              - sender
```

where `<<PLUGIN_URL>>` is the URL that points to the location where your bundled `SampleDataChannelPlugin.js`-file is hosted.
