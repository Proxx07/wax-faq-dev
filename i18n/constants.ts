import type { LanguagesTypes, LocaleItemType } from './types';

export const DEFAULT_LANGUAGE: LanguagesTypes = 'en';
export const COOKIE_LOCALE_KEY = 'lang';

export const localeItems: LocaleItemType[] = [
  {
    code: 'ru',
    language: 'ru-RU',
    name: 'Русский',
    files: [{ path: 'ru/common.json' }],
  },

  {
    code: 'en',
    language: 'en-US',
    name: 'English',
    files: [{ path: 'en/common.json' }],
  },
];
