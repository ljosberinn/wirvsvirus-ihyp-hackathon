import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import resources from '../i18n/de';

i18n.use(initReactI18next).init({
  resources,
  lng: 'de',
  fallbackLng: 'de',
  debug: false,
  load: 'languageOnly',
  interpolation: {
    escapeValue: false,
  },
  react: { useSuspense: false },
});

export default i18n;
