# Sample Nav Bar Plugin

## What is it?

The Sample Nav Bar Plugin serves as a demonstration of how developers can create their own custom plugins. This plugin includes a button. When you click on the button, a log will appear in the console.

![Gif of plugin demo](./public/assets/plugin.gif)

See the **Usage** section of the main README to see how to build and run plugins.

## Configuration Example

Add this to the `settings.yml` of the BBB HTML5-client:

```yaml
public:
  plugins:
    - name: SampleNavBarPlugin
      url: <<PLUGIN_URL>>
```

Where `<<PLUGIN_URL>>` is the URL that points to the location where your bundled `SampleNavBarPlugin.js`-file is hosted.
