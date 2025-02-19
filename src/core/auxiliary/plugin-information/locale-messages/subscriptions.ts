const GET_PLUGIN_INFORMATION = `
subscription GetPluginInformation {
  plugin {
    javascriptEntrypointIntegrity
    javascriptEntrypointUrl
    localesBaseUrl
    name
  }
}
`;

export { GET_PLUGIN_INFORMATION };
