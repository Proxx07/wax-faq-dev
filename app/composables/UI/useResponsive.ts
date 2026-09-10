export const useResponsive = () => {
  const breakpoints = {
    'small': 420,
    'mobile': 600,
    'tablet-s': 768,
    'tablet': 1024,
    'laptop-s': 1200,
    'laptop': 1440,
    'desktop': 1920,
  };

  const width = ref(0);

  const isMax = (key: keyof typeof breakpoints) => {
    return width.value <= breakpoints[key];
  };

  const isMin = (key: keyof typeof breakpoints) => {
    return width.value > breakpoints[key];
  };

  const update = () => {
    if (typeof window !== 'undefined') {
      width.value = window.innerWidth;
    }
  };

  onMounted(() => {
    update();
    window.addEventListener('resize', update);
  });

  onBeforeUnmount(() => {
    window.removeEventListener('resize', update);
  });

  return { isMax, isMin };
};
