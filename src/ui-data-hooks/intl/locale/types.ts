import { IntlLocaleUiDataNames } from './enums';

export type IntlLocaleUiDataPayloads = {
  [IntlLocaleUiDataNames.CURRENT_LOCALE]: {
    locale: string;
    fallbackLocale: string;
  }
};
