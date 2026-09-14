import type { LanguagesTypes, LocaleItemType } from './types';

export const DEFAULT_LANGUAGE: LanguagesTypes = 'en';
export const COOKIE_LOCALE_KEY = 'lang';

export const localeItems: LocaleItemType[] = [

  {
    code: 'en',
    language: 'en-US',
    name: 'English',
    files: [{ path: 'en/common.json' }],
  },

  {
    code: 'ru',
    language: 'ru-RU',
    name: 'Русский',
    files: [{ path: 'ru/common.json' }],
  },

  {
    code: 'ua',
    language: 'uk-UA',
    name: 'Українська',
    files: [{ path: 'ua/common.json' }],
  },

  {
    code: 'pl',
    language: 'pl-PL',
    name: 'Polski',
    files: [{ path: 'pl/common.json' }],
  },

  {
    code: 'es',
    language: 'es-ES',
    name: 'Español',
    files: [{ path: 'es/common.json' }],
  },

  {
    code: 'fr',
    language: 'fr-FR',
    name: 'Français ',
    files: [{ path: 'fr/common.json' }],
  },

  {
    code: 'zh',
    language: 'zh-CN',
    name: '中文 ',
    files: [{ path: 'zh/common.json' }],
  },

  {
    code: 'tr',
    language: 'tr-TR',
    name: 'Türkçe',
    files: [{ path: 'tr/common.json' }],
  },
  {
    code: 'de',
    language: 'de-DE',
    name: 'Deutsch',
    files: [{ path: 'de/common.json' }],
  },
];
