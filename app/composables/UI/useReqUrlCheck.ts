export const useReqUrlCheck = () => {
  const url = useRequestURL();

  const isPageInWaxpeer = computed(() => {
    return url.href.includes('waxpeer.com');
  });

  const setPageLink = (link: string) => {
    const url = link.startsWith('/') ? link : `/${link}`;
    return isPageInWaxpeer.value ? `/faq${url}` : link;
  };

  return {
    isPageInWaxpeer,
    setPageLink,
  };
};
