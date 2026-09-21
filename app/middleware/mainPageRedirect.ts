import { useReqUrlCheck } from '@/composables/UI';

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return true;

  const localePath = useLocalePath();
  if (window.innerWidth <= 1024) return true;

  const { setPageLink } = useReqUrlCheck();
  return navigateTo(localePath(setPageLink('/how-does-it-work')));
});
