import { PAGE_LIST } from '@/composables/usePage';
import { stringQueryCheck } from '@/utils/textFormatters';

export const useSearchStore = defineStore('search', () => {
  const { t } = useI18n();
  const searchQuery = ref('');

  const searchingPages = computed<Array<{ title: string, description: string, link: string }>>(() => {
    return PAGE_LIST.map((slug) => {
      return {
        title: t(`${slug}.title`),
        description: t(`${slug}.content.p1`),
        link: `/${slug}`,
      };
    });
  });

  const filterBySearch = computed(() => {
    if (!searchQuery.value) return [];
    const searchInString = stringQueryCheck(searchQuery.value);
    const regex = new RegExp(searchQuery.value, 'gi');

    return searchingPages.value
      .filter(({ title, description }) => {
        if (!searchQuery.value) return [];
        return searchInString(title) || searchInString(description);
      })
      .map((page) => {
        return {
          ...page,
          title: page.title.replace(regex, match => `<mark>${match}</mark>`),
          description: page.description.replace(regex, match => `<mark>${match}</mark>`),
        };
      });
  });

  const foundCount = computed(() => filterBySearch.value.length);

  return {
    searchQuery,
    searchingPages,
    filterBySearch,
    foundCount,
  };
});
