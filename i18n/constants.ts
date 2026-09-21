import type { LanguagesTypes, LocaleItemType } from './types';

export const DEFAULT_LANGUAGE: LanguagesTypes = 'en';
export const COOKIE_LOCALE_KEY = 'lang_faq';

export const localeItems: LocaleItemType[] = [

  {
    code: 'en',
    language: 'en-US',
    name: 'English',
    files: [{ path: 'en/capital-for-faq.json' }],
  },

  {
    code: 'ru',
    language: 'ru-RU',
    name: 'Русский',
    files: [{ path: 'ru/capital-for-faq.json' }],
  },

  {
    code: 'ua',
    language: 'uk-UA',
    name: 'Українська',
    files: [{ path: 'ua/capital-for-faq.json' }],
  },

  {
    code: 'pl',
    language: 'pl-PL',
    name: 'Polski',
    files: [{ path: 'pl/capital-for-faq.json' }],
  },

  {
    code: 'es',
    language: 'es-ES',
    name: 'Español',
    files: [{ path: 'es/capital-for-faq.json' }],
  },

  {
    code: 'fr',
    language: 'fr-FR',
    name: 'Français ',
    files: [{ path: 'fr/capital-for-faq.json' }],
  },

  {
    code: 'zh',
    language: 'zh-CN',
    name: '中文 ',
    files: [{ path: 'zh/capital-for-faq.json' }],
  },

  {
    code: 'tr',
    language: 'tr-TR',
    name: 'Türkçe',
    files: [{ path: 'tr/capital-for-faq.json' }],
  },
  {
    code: 'de',
    language: 'de-DE',
    name: 'Deutsch',
    files: [{ path: 'de/capital-for-faq.json' }],
  },
];
