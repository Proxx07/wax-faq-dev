import type { IUser } from './types';

export const useUser = () => {
  const { $request } = useNuxtApp();
  const _userCookie = useCookie('_redis');
  const _isCookieExist = computed(() => {
    return !!_userCookie.value;
  });

  const isUserFetching = ref(false);
  const user = shallowRef<IUser>();

  const clearCookie = () => {
    _userCookie.value = '';
  };

  const fetchUser = async () => {
    if (!_isCookieExist.value) return;

    const { data } = await $request<{ user: IUser }>('/api/user');
    if (!data?.user) return;
    user.value = data.user;
  };

  const logOut = async () => {
    const { error } = await $request('/api/logout');
    if (error) return;
    clearCookie();
    user.value = undefined;
  };

  return {
    user,
    isUserFetching,
    fetchUser,
    logOut,
  };
};
