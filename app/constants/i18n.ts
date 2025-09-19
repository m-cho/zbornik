// import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js';

import en from './locales/en.json';
import srCyrl from './locales/sr-Cyrl.json';
import srLatn from './locales/sr-Latn.json';

const i18n = new I18n({
  en,
  'sr-Cyrl': srCyrl,
  'sr-Latn': srLatn,
});

// @TODO: Handle locale changes in the app
// i18n.locale = getLocales()[0].languageCode as string;
i18n.locale = 'sr-Cyrl';

export default i18n;