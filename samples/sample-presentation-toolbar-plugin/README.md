# Sample Presentation Toolbar Plugin

## What is it?

The Sample Presentation Toolbar Plugin serves as a demonstration of how developers can create their own custom plugins. This plugin includes a button that displays the label "10s." When you click on the button, it transforms into a spinner and opens a modal window, providing information about the current presentation and its slide.

![Gif of plugin demo](./public/assets/plugin.gif)

See the **Usage** section of the main README to see how to build and run plugins.

## Configuration Example

Add this to the `settings.yml` of the BBB HTML5-client:

```yaml
public:
  plugins:
    - name: SamplePresentationToolbarPlugin
      url: <<PLUGIN_URL>>
```

Where `<<PLUGIN_URL>>` is the URL that points to the location where your bundled `SamplePresentationToolbarPlugin.js`-file is hosted.
