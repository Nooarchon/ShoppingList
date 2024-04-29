// i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import enTranslation from '../locales/en.json';
import czTranslation from '../locales/cz.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: enTranslation
      },
      cz: {
        translation: czTranslation
      }
    },
    lng: 'en', // Set the default language
    fallbackLng: 'en', // Fallback language if translation key is not found
    interpolation: {
      escapeValue: false // React already safes from xss
    }
  });

export default i18n;
