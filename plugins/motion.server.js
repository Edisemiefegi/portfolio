// SSR no-ops so templates using the motion directives render on the server.
export default defineNuxtPlugin((nuxtApp) => {
  const noop = { getSSRProps: () => ({}) };
  nuxtApp.vueApp.directive("reveal", { getSSRProps: () => ({ "data-reveal": "" }) });
  nuxtApp.vueApp.directive("tilt", noop);
  nuxtApp.vueApp.directive("magnetic", noop);
});
