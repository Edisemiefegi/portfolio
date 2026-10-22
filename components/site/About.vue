<template>
  <section id="about" class="mx-auto max-w-6xl px-4 py-24 md:px-8 md:py-36">
    <SiteSectionTitle index="01" eyebrow="About">
      A developer who sweats the <span class="font-serif italic text-muted">details</span>.
    </SiteSectionTitle>

    <div class="grid gap-4 md:grid-cols-6 md:grid-rows-[auto_auto]">
      <!-- bio -->
      <div v-reveal v-tilt="4" class="spot rounded-3xl p-6 md:col-span-4 md:p-10">
        <p class="text-xl leading-relaxed md:text-2xl">{{ profile.bio }}</p>
      </div>

      <!-- photo -->
      <div v-reveal="100" v-tilt="6" class="spot group relative min-h-72 overflow-hidden rounded-3xl md:col-span-2 md:row-span-2">
        <img :src="profile.photo" :alt="profile.name" class="absolute inset-0 h-full w-full object-cover object-top grayscale transition duration-700 group-hover:scale-105 group-hover:grayscale-0" />
        <div class="absolute inset-0 bg-gradient-to-t from-ink via-transparent" />
        <p class="absolute bottom-5 left-5 font-mono text-xs tracking-widest uppercase">{{ profile.name }}</p>
      </div>

      <!-- location + clock -->
      <div v-reveal="150" v-tilt="6" class="spot flex flex-col justify-between gap-6 rounded-3xl p-6 md:col-span-2">
        <i class="pi pi-map-marker text-accent" />
        <div>
          <p class="text-3xl font-medium tabular-nums">{{ time }}</p>
          <p class="text-sm text-muted">{{ profile.location }} · local time</p>
        </div>
      </div>

      <!-- stats -->
      <div v-reveal="200" v-tilt="6" class="spot grid grid-cols-2 gap-4 rounded-3xl p-6 md:col-span-2">
        <div v-for="s in stats" :key="s.label">
          <p class="text-4xl font-medium md:text-5xl">{{ s.value }}<span class="text-accent">+</span></p>
          <p class="text-sm text-muted">{{ s.label }}</p>
        </div>
      </div>

      <!-- beyond the code -->
      <div v-reveal="250" v-tilt="4" class="spot rounded-3xl p-6 md:col-span-6 md:p-10">
        <p class="mb-4 font-mono text-xs tracking-widest text-muted uppercase">Beyond the code</p>
        <p class="max-w-3xl font-serif text-2xl leading-snug text-fg/90 italic md:text-3xl">{{ profile.hobbie }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ profile: Object, projectCount: Number, experiences: Array });

const time = ref("--:--");
let timer;
const tick = () => {
  try {
    time.value = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: props.profile.timezone || undefined }).format(new Date());
  } catch {
    time.value = new Date().toTimeString().slice(0, 5);
  }
};
onMounted(() => {
  tick();
  timer = setInterval(tick, 10000);
});
onBeforeUnmount(() => clearInterval(timer));

// years since the earliest year found in the experience dates
const years = computed(() => {
  const found = props.experiences.flatMap((e) => String(e.date).match(/\d{4}/g) || []).map(Number);
  return found.length ? Math.max(1, new Date().getFullYear() - Math.min(...found)) : 3;
});

const stats = computed(() => [
  { value: years.value, label: "Years building" },
  { value: props.projectCount, label: "Projects shipped" },
]);
</script>
