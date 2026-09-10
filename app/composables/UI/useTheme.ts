import type { ThemeModes } from './types';

export const useTheme = () => {
  const colorMode = useColorMode();

  const themeList: ThemeModes[] = ['dark', 'blue', 'light'];
  const currentTheme = computed(() => colorMode.preference as ThemeModes);

  const setTheme = (mode: ThemeModes) => {
    colorMode.preference = mode;
  };

  return {
    themeList,
    currentTheme,
    setTheme,
  };
};
