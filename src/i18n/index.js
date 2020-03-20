import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import { ENABLED_LANGUAGES } from '../constants/env';
import resources from './de';

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'de',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false, // not needed with react
    },
    load: 'languageOnly',
    detection: {
      lookupLocalStorage: 'languagePreference', // key to store in
      order: ['localStorage', 'navigator'], // in which order to search for a language
    },
    ns: [], // removes 'translation' default key from backend query,
    defaultNS: [],
    whitelist: ENABLED_LANGUAGES,
    saveMissing: true,
  });
