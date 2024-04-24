# Sample Options Dropdown

## What is it?

The Sample Options Dropdown Plugin serves as a demonstration of how developers can create their own custom plugins. This plugin includes a separator after an option with label "Send an alert popup". When you click on the button, the menu will close and open an alert pop-up.

![Gif of plugin demo](./public/assets/plugin.gif)

See the **Usage** section of the main README to see how to build and run plugins.

## Configuration Example

Add this to the `settings.yml` of the BBB HTML5-client:

```yaml
public:
  plugins:
    - name: SampleOptionsDropdownPlugin
      url: <<PLUGIN_URL>>
```

Where `<<PLUGIN_URL>>` is the URL that points to the location where your bundled `SampleOptionsDropdownPlugin.js`-file is hosted.
