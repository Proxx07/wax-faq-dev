export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return true;
  if (window.innerWidth <= 1024) return true;
  const localePath = useLocalePath();

  return navigateTo(localePath('/how-does-it-work'));
});
