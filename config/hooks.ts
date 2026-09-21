import type { NuxtPage } from '@nuxt/schema';
import { createResolver } from '@nuxt/kit';

import { generateI18nModuleTypes } from './helpers/generateI18nModuleTypes';

const { resolve } = createResolver(import.meta.url);
export const hooks = {
  'prepare:types': function (option: any) {
    generateI18nModuleTypes();
    const paths = option.tsConfig.compilerOptions?.paths;
    if (!paths) return;
    delete paths['~'];
    delete paths['~/*'];
  },

  'pages:extend': (pages: NuxtPage[]) => {
    pages.push({
      name: 'faq-slug',
      path: '/faq/:slug',
      file: resolve('../app/pages/[slug].vue'),
    });
  },
};
