# Bigblubutton HTML5 Plugins

## Implementation

In order to test it out, it is necessary to have the sdk installed, make a bundle out of the plugin, then, you ought to place it into the right location. Next, in the `settings.yml` file you are going to create the plugin directive as well as its properties, see steps below:

1. Install SDK:
To do this, you will need to build and pack the SDK into a tarball:
```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/
rm bigbluebutton-html-plugin-sdk-1.0.0.tgz # Remove previously built version of SDK, ignore if there is none.
npm run prepublishOnly-p
npm pack
```
Then, in the plugin, you will install the packed SDK:
```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/sample-whiteboard-toolbar
npm install ../bigbluebutton-html-plugin-sdk-1.0.0.tgz # This will get the previously built tarball and install it
```
At last, do the same for HTML-5, the client component:
```bash
cd $HOME/src/bigbluebutton-html5
meteor npm install ../bigbluebutton-html-plugin-sdk/bigbluebutton-html-plugin-sdk-1.0.0.tgz
```

2. Bundle the plugin and place it into the right location:
To bundle the sample-whiteboard-toolbar run:
```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/sample-whiteboard-toolbar
npm run build-bundle
```

It will generate the `dist` folder which contains the bundled js file (in this case called `SampleWhiteboardToolbarItems.js`, but you can change this in `webpack.config.js`).
For the purpose of just testing, we want to place it right into our project's server, but it is configurable, you can copy the file anywhere you want, just make sure to point it correctly on the `settings.yml`. 
We are going to create a directory `/var/www/bigbluebutton-default/assets/plugins` and move the bundled plugin there, as follows:

```bash
mkdir /var/www/bigbluebutton-default/assets/plugins
sudo cp $HOME/src/bigbluebutton-html5-plugins/sample-whiteboard-toolbar/dist/SampleWhiteboardToolbarItems.js /var/www/bigbluebutton-default/assets/plugins
```

3. `settings.yml` configuration:
Next we will change the `settings.yml` file from bbb-html5, and insert the following lines:

```yaml
plugins:
    - name: myCustomWhiteboardToolbarButton
      url: https://<your-host>/plugins/WhiteboardToolbarButton.js
```

alongside with the app directive, just as follows:

```yaml
public:
    app:
      ... // All app configs
    plugins:
        - name: myCustomWhiteboardToolbarButton
          url: https://<your-host>/plugins/WhiteboardToolbarButton.js
    ... // All other configs

```

And there you go, it is already possible to use.

To create a custom Plugin yourself, just follow the general structure of the sample-whiteboard-toolbar

## Integration features

### Available places for plugin
For now the only place that accepts the plugin architecture is: 
 - Whiteboard toolbar button;

### Available Hooks for information
You have the `useCurrentPresentation` hook available from the SDK to find out information regarding the current presentation. It will naturally update whenever any presentation information changes.
