# Sample Custom Hook Plugin

## What is it?

The Sample Custom Hook Plugin serves as a demonstration of how developers can create their own custom hooks. This plugin includes a button that displays the label "See preview of next slide". When you click on the button, a modal will open with a preview of the next slide. 

![Gif of plugin demo](./public/assets/plugin-hook-presentation.gif)

Another feature of this plugin is the alert popup that appears with the count of the users with the same name as the current user (self user).

![Gif of plugin demo](./public/assets/plugin-hook-user.gif)

See the **Usage** section of the main README to see how to build and run plugins.

## Configuration Example

Add this to the `settings.yml` of the BBB HTML5-client:

```yaml
public:
  plugins:
    - name: SampleCustomSubscriptionPlugin
      url: <<PLUGIN_URL>>
```

Where `<<PLUGIN_URL>>` is the URL that points to the location where your bundled `SampleCustomSubscriptionPlugin.js`-file is hosted.
