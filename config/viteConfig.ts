export const viteConfig = {
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "~/assets/styles/mixins.scss" as *;',
      },
    },
  },
  build: {
    assetsInlineLimit(filePath: string) {
      if (filePath.includes('assets/icons/skins')) return true;
      return undefined;
    },
  },
};
