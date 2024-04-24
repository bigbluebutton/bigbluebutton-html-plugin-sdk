# Sample Action bar items Plugin

## What is it?

The Sample Action bar items Plugin serves as a demonstration of how developers can create their own custom plugins, in this case it goes into the actions bar. This plugin includes a separator and a button with a user icon that will alert the user with the message "The action bar button from plugin was clicked".

![Gif of plugin demo](./public/assets/plugin.gif)

See the **Usage** section of the main README to see how to build and run plugins.

## Configuration Example

Add this to the `settings.yml` of the BBB HTML5-client:

```yaml
public:
  plugins:
    - name: SampleActionsBarPlugin
      url: <<PLUGIN_URL>>
```

Where `<<PLUGIN_URL>>` is the URL that points to the location where your bundled `SampleActionButtonDropdownPlugin.js`-file is hosted.
