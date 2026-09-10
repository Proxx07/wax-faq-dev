export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return true;

  const localePath = useLocalePath();

  if (window.innerWidth <= 1024) return true;

  return navigateTo(localePath('/how-does-it-work'));
});
