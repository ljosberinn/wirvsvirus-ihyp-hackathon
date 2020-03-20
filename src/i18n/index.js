import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import { ENABLED_LANGUAGES } from '../constants/env';
import resources from './de';

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'de',
  lng: 'de',
  debug: process.env.NODE_ENV === 'development',
  interpolation: {
    escapeValue: false, // not needed with react
  },
  load: 'languageOnly',
  ns: [], // removes 'translation' default key from backend query,
  defaultNS: [],
  whitelist: ENABLED_LANGUAGES,
});
