import * as React from 'react';
import { IntlLocaleUiDataNames } from '../../../../ui-data-hooks';
import { pluginLogger } from '../../../../utils';
import { IntlMessages, UseLocaleMessagesProps } from './types';

function useLocaleMessagesAuxiliary(
  { pluginApi, fetchConfigs }: UseLocaleMessagesProps,
): IntlMessages {
  const currentLocale = pluginApi.useUiData!(IntlLocaleUiDataNames.CURRENT_LOCALE, {
    locale: 'en',
    fallbackLocale: 'en',
  });

  const [loading, setLoading] = React.useState(true);
  const [messages, setMessages] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    if (pluginApi?.localesBaseUrl && currentLocale.locale) {
      const { localesBaseUrl } = pluginApi;
      const { locale } = currentLocale;
      const localeUrl = `${localesBaseUrl}/${locale}.json`;
      fetch(localeUrl, fetchConfigs).then((result) => result.json()).then((localeMessages) => {
        setLoading(false);
        setMessages(localeMessages);
      }).catch((err) => {
        setLoading(false);
        pluginLogger.error(`Something went wrong while trying to fetch ${localeUrl}: `, err);
      });
    }
  }, [currentLocale]);
  return {
    messages,
    loading,
    currentLocale: currentLocale.locale,
  };
}

export default useLocaleMessagesAuxiliary;
