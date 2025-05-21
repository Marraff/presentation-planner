import i18next from "i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from './i18n/en.json';
import sk from './i18n/sk.json';


i18next
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
    resources: {
      en: {
        translation: en
      },
      sk: {
        translation: sk
      }

    },
    lng: 'en', 
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, 
    },
       
    });