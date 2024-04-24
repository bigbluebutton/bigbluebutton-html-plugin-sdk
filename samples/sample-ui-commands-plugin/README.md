# Sample Ui Commands Plugin

## What is it?

The Sample Ui Commands Plugin serves as a demonstration of how developers can create their own custom plugins. It will simply open the poll creation sidebar content, and will also fill it with it's information (feel free to change it to fit your needs).

![png of plugin demo](./public/assets/plugin.png)

See the **Usage** section of the main README to see how to build and run plugins.

## Configuration Example

Add this to the `settings.yml` of the BBB HTML5-client:

```yaml
public:
  plugins:
    - name: SampleUiCommandsPlugin
      url: <<PLUGIN_URL>>
```

Where `<<PLUGIN_URL>>` is the URL that points to the location where your bundled `SampleUiCommandsPlugin.js`-file is hosted.
