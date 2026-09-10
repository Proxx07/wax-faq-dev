export const useDrawerStore = defineStore('drawer', () => {
  const isOpened = ref(false);

  const openDrawer = () => {
    isOpened.value = true;
  };

  const closeDrawer = () => {
    isOpened.value = false;
  };

  const toggleDrawer = () => {
    isOpened.value = !isOpened.value;
  };

  return {
    isOpened,
    openDrawer,
    closeDrawer,
    toggleDrawer,
  };
});
