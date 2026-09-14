import type { LocaleObject } from '@nuxtjs/i18n';

export type LanguagesTypes = 'ru' | 'en' | 'ua' | 'pl' | 'es' | 'fr' | 'zh' | 'tr' | 'de';

export type LocaleItemType = LocaleObject<LanguagesTypes>;
