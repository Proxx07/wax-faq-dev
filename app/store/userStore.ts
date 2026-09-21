export const useUserStore = () => {
  const userCookie = useCookie('_redis');
  const isUser = computed(() => userCookie.value);

  return {
    isUser,
    userCookie,
  };
};
