# Sample Generic Sidekick Content

## What is it?

The Sample Generic Sidekick Content Plugin serves as a demonstration of how developers can create their own custom plugins. This plugin includes two generic sidekick components that are automatically integrated into the navigation bar when injected through the plugin system. When the navigation bar buttons are clicked, they open the sidekick panel displaying the associated generic sidekick content.

![Gif of plugin demo](./public/assets/plugin.gif)

See the **Usage** section of the main README to see how to build and run plugins.

## Configuration Example

Add this to the `settings.yml` of the BBB HTML5-client:

```yaml
public:
  plugins:
    - name: SampleGenericSidekickContentPlugin
      url: <<PLUGIN_URL>>
```

Where `<<PLUGIN_URL>>` is the URL that points to the location where your bundled `SampleGenericSidekickContentPlugin.js`-file is hosted.

## More
Generic content can be of two types: 'MAIN' and 'SIDEKICK'. This sample demonstrates how to use the 'SIDEKICK' type. For information on using the 'MAIN' type, please refer to the sample-action-button-dropdown-plugin.
