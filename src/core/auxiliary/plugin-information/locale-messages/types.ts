import { PluginApi } from 'src/core/api/types';

interface UseLocaleMessagesProps {
  pluginApi: PluginApi;
  fetchConfigs?: RequestInit;
}

interface PluginInformationResult {
  javascriptEntrypointIntegrity: string;
  javascriptEntrypointUrl: string;
  localesBaseUrl: string;
}

interface GraphqlResponseWrapper {
  plugin: PluginInformationResult[];
}

interface IntlMessages {
  loading: boolean;
  messages: Record<string, string>;
  currentLocale: string;
}

type UseLocaleMessagesFunction = (fetchConfigs?: RequestInit) => IntlMessages;

export {
  UseLocaleMessagesProps,
  PluginInformationResult,
  GraphqlResponseWrapper,
  IntlMessages,
  UseLocaleMessagesFunction,
};
