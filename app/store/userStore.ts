import { useUser } from '@/composables/useUser';

export const useUserStore = defineStore('user', () => {
  const { isUserFetching, user, fetchUser, logOut } = useUser();

  return {
    user,
    isUserFetching,
    fetchUser,
    logOut,
  };
});
