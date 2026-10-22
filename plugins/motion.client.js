// Small motion toolkit: v-reveal (scroll in), v-tilt (3D tilt + spotlight), v-magnetic (cursor pull).
const reduced = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = () => window.matchMedia("(pointer: fine)").matches;

export default defineNuxtPlugin((nuxtApp) => {
  const observer = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("is-in");
          observer.unobserve(e.target);
        }
      }),
    { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
  );

  nuxtApp.vueApp.directive("reveal", {
    mounted(el, { value }) {
      el.setAttribute("data-reveal", "");
      if (value) el.style.setProperty("--d", `${value}ms`);
      observer.observe(el);
    },
    unmounted(el) {
      observer.unobserve(el);
    },
  });

  nuxtApp.vueApp.directive("tilt", {
    mounted(el, { value = 8 }) {
      const move = (e) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty("--mx", `${x * 100}%`);
        el.style.setProperty("--my", `${y * 100}%`);
        if (reduced() || !finePointer()) return;
        el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * value}deg) rotateY(${(x - 0.5) * value}deg)`;
      };
      const leave = () => (el.style.transform = "");
      // keep reveal's opacity/translate transitions alongside the tilt
      el.style.transition = "transform .4s cubic-bezier(.2,.7,.2,1), opacity .9s cubic-bezier(.2,.7,.2,1) var(--d,0ms), translate .9s cubic-bezier(.2,.7,.2,1) var(--d,0ms), filter .9s var(--d,0ms)";
      el.style.transformStyle = "preserve-3d";
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      el._tilt = { move, leave };
    },
    unmounted(el) {
      el.removeEventListener("pointermove", el._tilt.move);
      el.removeEventListener("pointerleave", el._tilt.leave);
    },
  });

  nuxtApp.vueApp.directive("magnetic", {
    mounted(el, { value = 0.35 }) {
      const move = (e) => {
        if (reduced() || !finePointer()) return;
        const r = el.getBoundingClientRect();
        el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * value}px, ${(e.clientY - r.top - r.height / 2) * value}px)`;
      };
      const leave = () => (el.style.transform = "");
      el.style.transition = "transform .35s cubic-bezier(.2,.7,.2,1)";
      el.addEventListener("pointermove", move);
      el.addEventListener("pointerleave", leave);
      el._mag = { move, leave };
    },
    unmounted(el) {
      el.removeEventListener("pointermove", el._mag.move);
      el.removeEventListener("pointerleave", el._mag.leave);
    },
  });
});
