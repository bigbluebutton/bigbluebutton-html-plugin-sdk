# Sample Floating Window Plugin

## What is it?

The Sample Floating Window Plugin serves as a demonstration of how developers can create their own custom plugins. This plugin includes a movable window to take private notes, it is possible to move around, minimize and close it.

![Gif of plugin demo](./public/assets/plugin.gif)

See the **Usage** section of the main README to see how to build and run plugins.

## Configuration Example

Add this to the `settings.yml` of the BBB HTML5-client:

```yaml
public:
  plugins:
    - name: SampleFloatingWindowPlugin
      url: <<PLUGIN_URL>>
```

Where `<<PLUGIN_URL>>` is the URL that points to the location where your bundled `SampleFloatingWindowPlugin.js`-file is hosted.
