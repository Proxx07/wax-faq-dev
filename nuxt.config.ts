// https://nuxt.com/docs/api/configuration/nuxt-config
import { colorModeConfig, hooks, viteConfig } from './config';
import { COOKIE_LOCALE_KEY, DEFAULT_LANGUAGE, localeItems } from './i18n/constants';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'Waxpeer FAQ',
      link: [
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          type: 'image/png',
          href: '/apple-touch-icon.png',
        },

        { rel: 'icon', type: 'image/x-icon', sizes: '16x16', href: '/favicon.ico' },
        { rel: 'icon', type: 'image/x-icon', sizes: '32x32', href: '/favicon.ico' },
      ],
    },
    buildAssetsDir: '/_faq_nuxt/',
  },

  experimental: {
    viewTransition: false,
  },

  runtimeConfig: {
    apiBaseUrl: 'NUXT_API_BASE_URL',
  },

  css: ['~/assets/styles/global.scss'],

  routeRules: {
    '/fonts/**': { headers: { 'cache-control': 'public, max-age=31536000, immutable' } },
  },

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/color-mode',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],

  i18n: {
    defaultLocale: DEFAULT_LANGUAGE,
    strategy: 'prefix_except_default',
    vueI18n: 'config.ts',
    locales: localeItems,
    langDir: 'locales',
    compilation: {
      strictMessage: false,
    },

    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: COOKIE_LOCALE_KEY,
      redirectOn: 'root',
    },
  },

  hooks,

  imports: {
    scan: false,
  },

  components: {
    dirs: [],
  },

  colorMode: colorModeConfig,

  typescript: {
    typeCheck: true,
  },

  vite: viteConfig,
});
