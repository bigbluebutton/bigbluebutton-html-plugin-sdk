import { PluginApi } from '../../../../core/api/types';

export interface UseLocaleMessagesProps {
  pluginApi: PluginApi;
  fetchConfigs?: RequestInit;
}

export interface PluginInformationResult {
  javascriptEntrypointIntegrity: string;
  javascriptEntrypointUrl: string;
  localesBaseUrl: string;
}

export interface IntlMessages {
  loading: boolean;
  messages: Record<string, string>;
  currentLocale: string;
}

export type UseLocaleMessagesFunction = (fetchConfigs?: RequestInit) => IntlMessages;

export interface DataWaitingWrapper<T> {
  data: T;
  loading: boolean;
  error?: object;
}
