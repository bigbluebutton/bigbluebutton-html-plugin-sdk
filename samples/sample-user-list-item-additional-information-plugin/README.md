# Sample User List Icon Plugin

## What is it?

The Sample User List Icon Plugin serves as a demonstration of how developers can create their own custom plugins, in this case each participant will have a sort of warning badge right on the user's name side. See example below

![Gif of plugin demo](./public/assets/plugin.png)

See the **Usage** section of the main README to see how to build and run plugins.

## Configuration Example

Add this to the `settings.yml` of the BBB HTML5-client:

```yaml
public:
  plugins:
    - name: SampleUserListItemAdditionalInformationPlugin
      url: <<PLUGIN_URL>>
```

Where `<<PLUGIN_URL>>` is the URL that points to the location where your bundled `SampleUserListItemAdditionalInformationPlugin.js`-file is hosted.
