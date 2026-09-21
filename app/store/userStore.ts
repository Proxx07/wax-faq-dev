export const useUserStore = () => {
  const { $request } = useNuxtApp();

  const _userCookie = useCookie('_redis');

  const _isCookieExist = computed(() => {
    return !!_userCookie.value;
  });

  const user = shallowRef<any>();

  const getUser = async () => {
    if (!_isCookieExist.value) return;

    const { data } = await $request<{ user: any }>('/api/user');
    if (!data?.user) return;

    // eslint-disable-next-line no-console
    console.log(data);
    user.value = data.user;
  };

  return {

    _userCookie,
    _isCookieExist,

    user,
    getUser,
  };
};
