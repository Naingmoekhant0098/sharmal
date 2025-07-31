import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import my from './my.json';
import en from './en.json';
import ja from './ja.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      my: { translation: my },
      en: { translation: en },
      ja: { translation: ja },
    },
    lng: 'my',
    fallbackLng: 'my',
    interpolation: { escapeValue: false },
  });

export default i18n;
