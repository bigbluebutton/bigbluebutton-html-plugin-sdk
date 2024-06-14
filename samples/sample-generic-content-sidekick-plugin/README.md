# Sample Generic Content Sidekick

## What is it?

The Sample Generic Content Sidekick Plugin serves as a demonstration of how developers can create their own custom plugins. This plugin includes two generic sidekick components that are automatically integrated into the navigation bar when injected through the plugin system. When the navigation bar buttons are clicked, they open the sidekick panel displaying the associated generic sidekick content.

![Gif of plugin demo](./public/assets/plugin.gif)

See the **Usage** section of the main README to see how to build and run plugins.

## Configuration Example

Add this to the `settings.yml` of the BBB HTML5-client:

```yaml
public:
  plugins:
    - name: SampleGenericContentSidekickPlugin
      url: <<PLUGIN_URL>>
```

Where `<<PLUGIN_URL>>` is the URL that points to the location where your bundled `SampleGenericContentSidekickPlugin.js`-file is hosted.

## More
Generic content can be of two types: 'MAIN_AREA' and 'SIDEKICK_AREA'. This sample demonstrates how to use the 'SIDEKICK_AREA' type. For information about using the 'MAIN_AREA' type, please refer to the sample-action-button-dropdown-plugin.