export default defineNuxtRouteMiddleware((to) => {
  if (import.meta.server) return true;
  // eslint-disable-next-line no-console
  console.log('redirect-to', to);
  const localePath = useLocalePath();

  if (window.innerWidth <= 1024) return true;

  return navigateTo(localePath('/how-does-it-work'));
});
