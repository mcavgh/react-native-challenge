import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import en from './locales/en.json';
import es from './locales/es.json';

const resources = {
  en: {
    translation: en
  },
  es: {
    translation: es
  }
};


i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: I18nManager.isRTL ? 'es' : 'en',
    fallbackLng: 'es',
    debug:false, 
    
    interpolation: {
      escapeValue: false, 
    },
    
    react: {
      useSuspense: false,
    },
  });

export default i18n;