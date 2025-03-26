# Plugin Versioning

Welcome to the BigBlueButton html plugin SDK.

This repository has the code of the SDK used to develop a plugin.

Mind that we have a different branch for each version of the SDK. This happens so we garantee that everything merged on one of the branches is compatible with the CORE in its correspondent version. As for now, see a correspondence of branches, SDK versions and BBB core version.

| Repository Branch | Plugin-SDK Version | BigBlueButton Core Version |
|------------------|--------------------|----------------------------|
| v0.0.x           | v0.0.x            | v3.0.x                    |
| v0.1.x           | v0.1.x            | v3.1.x                     |

See that this branch (`main`) does not contain any code, that's because this branch is used only for basic documentation. If you want further information about the pluginApi features themselves, see the documentation (`readme` files) within the specific branch you are interested in. We do this separation because from now on, `v0.1.x` is becoming more and more different from the other one `v0.0.x`.

If you have any suggestions, requirements or questions, don't hesitate to contat us.

With that said, here it follows the basic documentation of the pluginSdk:

# BigBlueButton SDK for HTML5 Client Plugins

This repository contains the SDK for developing BigBlueButton plugins.
Plugins are React components that can be loaded from external sources
by the BigBlueButton HTML5 client to extend its functionalities.

## Overview

An overview of the plugin architecture and capabilities can be found [here](https://github.com/bigbluebutton/plugins/blob/main/README.md#capabilities-and-technical-details).

### Building a Hello-World plugin example

This section will go through all the steps one needs to follow in order to have a usable plugin, or at least a good starting point. In this case, the intended example plugin will add an option within the "options" dropdown menu (3 dots in the top right-hand corner of your client) that when clicked, will trigger a pop up containing "hello world".

1. First and foremost, choose the bbb-plugin-sdk's version based on the your BigBlueButton server, just as is mentioned in section [plugin versioning](#plugin-versioning), this information will be used later on this tutorial.

2. Use the template of a plugin provided by the BiBlueButton organization under [this URL](https://github.com/bigbluebutton/plugin-template).

Of course you can start a plugin from scratch, but you would need some specific configurations in the `package.json` and in  the `webpack.config.js` (if using this bundler), which can be tricky to figure out. So that's why using the template can come in handy: all basic configurations are given to you, so you can focus on the code in mind.

Once you get in the template's page, click the button "Use this template" so you can create a repository out of it, within your github user account just like showed in the image bellow.
![Plugin template github page showing where to click](assets/img/plugin-template-tutorial.png)

3. Clone this new repository locally and start modifying the code. The following substeps will walk you through this task:
  - Let's first give a name for the plugin we are developing, I'll choose plugin-hello-world for this example, but you can choose any name but bear in mind that we must have the PascalCased name as well (in our case here "PluginHelloWorld");
  - Now insert this name in all needed places, that is with "<plugin-name>" marked to be changed: `package.json`, `webpack.config.js` and `manifest.json` (these last 2 must be filled in with the PascalCased version);
  - Go to https://www.npmjs.com/package/bigbluebutton-html-plugin-sdk and see the current version according to your BBB server, in my case here, the last version published was `0.1.2`, but since I am using BigBlueButton 3.0, I need to check the last version of the `0.0.x`, which is `0.0.73`;
  - Now in `package.json` update the version of the SDK, if needed, to that of the last published one (The package you want to search for is `bigbluebutton-html-plugin-sdk`);
  - Run `npm install` to install all dependencies;
  - Now create a folder to store the componentes you will create for the plugin, in our case, I will name it `plugin-hello-world` and it will be inside src, so the command would be `mkdir src/plugin-hello-world`;
  - create a file called component inside the previously mentioned folder called `component.tsx`
  - There you can insert whatever code you want, I will insert the following

```tsx
  import { BbbPluginSdk, OptionsDropdownOption, pluginLogger } from 'bigbluebutton-html-plugin-sdk';
  import * as React from 'react';
  import { useEffect } from 'react';

  interface PluginHelloWorldProps {
    pluginUuid: string;
  }

  function PluginHelloWorld(
    { pluginUuid }: PluginHelloWorldProps,
  ): React.ReactElement<PluginHelloWorldProps> {
    BbbPluginSdk.initialize(pluginUuid);
    const pluginApi = BbbPluginSdk.getPluginApi(pluginUuid);

    useEffect(() => {
      pluginApi.setOptionsDropdownItems([
        new OptionsDropdownOption({
          label: 'Click me',
          icon: 'user',
          onClick: () => {
            alert('hello wrold');
            pluginLogger.info('Option has been clicked');
          },
        }),
      ]);
    }, []);

    return null;
  }
  export default PluginHelloWorld;
```
  - The `useEffect` function is there to only prevent this component to run multiple times and update unecessarily;
  - Then the `setOptionsDropdownItems` is the SDK function that will add the button in the dropdown;
  - The `onclick` will create a pop-up with the message "hello world" as expected;
  - Now, as for the `index.tsx`, you can paste the following code there:

```tsx
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import PluginTemplateHelloWorld from './plugin-hello-world/component';

const uuid = document.currentScript?.getAttribute('uuid') || 'root';

const pluginName = document.currentScript?.getAttribute('pluginName') || 'plugin';

const root = ReactDOM.createRoot(document.getElementById(uuid));
root.render(
  <PluginHelloWorld {...{
    pluginUuid: uuid,
    pluginName,
  }}
  />
);

```

All done, that's it! You have a plugin!

About instructions on how to run it, you will have to choose between running it development mode or production mode, and for that, use the sections [dev](#running-the-plugin-from-source) or [prod](#building-the-plugin-production).

Feel free to reach out to us for additional information. 


## Usage

This is a general instruction on how to use a plugin.
For a detailed configuration example of each use case,
have a look at the READMEs in the respective samples folders inside the respective versioned branch of this SDK repository.

### Running the Plugin from Source

For development purposes you can run a plugin locally from source.

For example if you take the [`sample-action-button-dropdown-plugin`](samples/sample-action-button-dropdown-plugin),
you do the following:

*Running from source code with local BBB-server*

1. Start the development server:

   ```bash
   cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-action-button-dropdown-plugin
   npm install
   npm start
   ```

2. Add reference to it on BigBlueButton's `/create` call or add it on `/usr/share/bbb-web/WEB-INF/classes/bigbluebutton.properties`:

```
pluginManifests=[{"url": "http://localhost:4701/manifest.json"}]
```

*Running from souce code with a remote BBB-server*

If you are running your BBB-server elsewhere, than you can't simply point the manifest URL to a local address, you'll need to either serve the built version into a CDN or serve the dev version using a service to make it public. And for the second option we'd recommend NGROK. Here are the instructions to do that:

1. Create an account on https://ngrok.com/ (Official website of NGROK);

2. Install NGROK in your computer. They have a guide for that right after you created your account;

3. Start the Plugin development server:

```bash
cd $HOME/src/plugin-pick-random-user-plugin
npm install
npm start
```

4. Start the NGROK server into your machine with the following command:

```bash
ngrok http http://172.17.0.1:4701
```

Make sure to point NGROK to the correct local URL (In our case - The samples are made this way, for instance - we used `http://172.17.0.1:4701`)

Right after that, NGROK will create an interface into your terminal and will display the URL which your static files are being served.

Here's an example of URL: `https://<uuid>.ngrok-free.app`

You can already interact with this URL and access both 

`https://<uuid>.ngrok-free.app/manifest.json`

or

`https://<uuid>.ngrok-free.app/PickRandomUserPlugin.js`


5. Add this create parameter into the API-mate of the server you are testing it on:

```
pluginManifests=[{"url": "https://<uuid>.ngrok-free.app/manifest.json"}]
```

And there you go, you can test it freely.

**Big reminder:** Ngrok's free plan inserts an interstitial page that you need to interact with at least once before running your application, and that goes to each browser you're running on (For example if you interacted on chrome, you will have to interact again on firefox in order to use it there).

So, possible errors might occur such as plugin not loading in your page, this would have to do with the fact that you didn't interact with ngrok's page before. This is easy to fix, just access this link `https://<uuid>.ngrok-free.app/manifest.json` to see if its working.

It will happen everytime you reload ngrok, like stoped the service and started again: the interstitial page will reappear.

### Building the Plugin (Production)

To build a plugin for production use
(again, using the example of [`sample-action-button-dropdown-plugin`](samples/sample-action-button-dropdown-plugin)),
follow these steps:

```bash
cd $HOME/src/bigbluebutton-html-plugin-sdk/samples/sample-action-button-dropdown-plugin
npm ci
npm run build-bundle
```

The above command will generate the `dist` folder, containing the bundled JavaScript file named `SampleActionButtonDropdownPlugin.js` along with the `manifest.json`.
These files can be hosted on any HTTPS server.

To use the plugin with BigBlueButton, add the plugin's `manifest.json` URL to `bigbluebutton.properties` or you can simply send it via `/create` parameter:

```
pluginManifests=[{"url":"<your-domain>/path/to/manifest.json"}]
```

#### Hosting the Plugin on a BBB Server

While the plugin can be hosted on any Server, it is also possible to host the bundled file directly on
a BigBlueButton server. For that you copy `dist/SampleActionButtonDropdownPlugin.js` and `dist/manifest.json` to the folder `/var/www/bigbluebutton-default/assets/plugins/sampleActionButtonDropdownPlugin`.
In this case, the your manifest URL will be `https://<your-host>/plugins/sampleActionButtonDropdownPlugin/manifest.json`.

### Manifest Json

Here is as complete `manifet.json` example with all possible configurations:

```json
{
  "requiredSdkVersion": "<version>",
  "name": "MyPlugin",
  "javascriptEntrypointUrl": "MyPlugin.js",
  "localesBaseUrl": "https://cdn.domain.com/my-plugin/", // Optional
  "dataChannels":[
    {
      "name": "public-channel",
      "pushPermission": ["moderator","presenter"], // "moderator","presenter", "all"
      "replaceOrDeletePermission": ["moderator", "creator"] // "moderator", "presenter","all", "creator"
    }
  ], // One can enable more data-channels to better organize client communication
  "eventPersistence": {
    "isEnabled": true, // By default it is not enabled
    "maximumPayloadSizeInBytes": 1024,
    "rateLimiting": {
      "messagesAllowedPerSecond": 10,
      "messagesAllowedPerMinute": 20
    }
  },
  "remoteDataSources": [
    {
      "name": "allUsers",
      "url": "${meta_pluginSettingsUserInformation}",
      "fetchMode": "onMeetingCreate", // Possible values: "onMeetingCreate", "onDemand" 
      "permissions": ["moderator", "viewer"]
    }
  ]
}
```
