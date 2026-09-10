import { ASIDE_NAVIGATION_ITEMS } from './model';

export const useAsideNavigation = () => {
  const { t } = useI18n();

  const list = computed(() => {
    return ASIDE_NAVIGATION_ITEMS.map((item) => {
      return {
        ...item,
        groupName: t(item.groupName),
        children: !item.children
          ? []
          : item.children.map(child => ({ ...child, name: t(child.name) })),
      };
    });
  });

  return {
    list,
  };
};
