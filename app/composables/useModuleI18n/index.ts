import type { I18nModuleType } from './types';
import { PAGE_LIST } from '@/composables/usePage';

export const useModuleI18n = async (module: I18nModuleType | 'all') => {
  const { locale, mergeLocaleMessage } = useI18n();
  try {
    if (module === 'all') {
      await Promise.all(
        PAGE_LIST.map(async (page) => {
          try {
            const messages = await import(`~~/i18n/locales/${locale.value}/${page}.json`);
            mergeLocaleMessage(locale.value, messages.default || messages);
          }
          catch (err) {
            console.error(`Failed to load i18n module: ${page} for locale: ${locale.value}`, err);
          }
        }),
      );
    }
    else {
      const messages = await import(`~~/i18n/locales/${locale.value}/${module}.json`);
      mergeLocaleMessage(locale.value, messages.default || messages);
    }
  }
  catch {
    console.error(`Failed to load i18n module: ${module} for locale: ${locale.value}`);
  }
};

export * from './types';
