<template>
  <section id="contact" class="relative overflow-hidden px-4 py-24 md:px-8 md:py-36">
    <div class="pointer-events-none absolute -bottom-1/2 left-1/2 h-[80vw] max-h-[900px] w-[80vw] max-w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgb(139_108_255/0.25),transparent_60%)] blur-2xl" />

    <div class="relative mx-auto max-w-6xl">
      <p v-reveal class="mb-6 font-mono text-xs tracking-widest text-accent uppercase">05 / Contact</p>
      <h2 v-reveal="100" class="mb-14 text-[12vw] leading-[0.9] font-medium tracking-[-0.04em] md:text-[8rem]">
        Let’s build <br /><span class="font-serif font-normal italic text-muted">something</span> <span class="shine">great.</span>
      </h2>

      <div class="grid gap-10 md:grid-cols-[1.3fr_1fr]">
        <form v-reveal="200" class="spot space-y-5 rounded-3xl p-6 md:p-10" @submit.prevent="submit">
          <template v-if="state !== 'sent'">
            <div class="grid gap-5 sm:grid-cols-2">
              <label class="field"><span>Name</span><input v-model="form.name" required autocomplete="name" placeholder="Jane Doe" /></label>
              <label class="field"><span>Email</span><input v-model="form.email" required type="email" autocomplete="email" placeholder="jane@company.com" /></label>
            </div>
            <label class="field"><span>Subject</span><input v-model="form.subject" required placeholder="Project, role, or just hello" /></label>
            <label class="field"><span>Message</span><textarea v-model="form.message" required rows="5" placeholder="Tell me about your idea…" /></label>
            <button :disabled="state === 'sending'" class="group flex w-full items-center justify-center gap-2 rounded-full bg-fg py-4 font-medium text-ink transition hover:bg-accent disabled:opacity-60">
              {{ state === "sending" ? "Sending…" : "Send message" }}
              <i class="pi pi-arrow-right text-xs transition group-hover:translate-x-1" />
            </button>
            <p v-if="state === 'error'" class="text-sm text-red-400">Something went wrong — please email me directly.</p>
          </template>
          <div v-else class="flex flex-col items-center justify-center gap-4 py-16 text-center">
            <span class="grid h-16 w-16 place-items-center rounded-full bg-accent text-ink"><i class="pi pi-check text-xl" /></span>
            <p class="text-2xl font-medium">Message received.</p>
            <p class="text-muted">I typically reply within 24 hours.</p>
            <button type="button" class="text-sm text-accent underline-offset-4 hover:underline" @click="state = 'idle'">Send another</button>
          </div>
        </form>

        <div v-reveal="300" class="flex flex-col gap-4">
          <button v-magnetic="0.15" class="spot group flex items-center justify-between rounded-3xl p-6 text-left" @click="copy">
            <div>
              <p class="mb-1 font-mono text-xs tracking-widest text-muted uppercase">{{ copied ? "Copied!" : "Email — click to copy" }}</p>
              <p class="text-lg break-all md:text-xl">{{ profile.email }}</p>
            </div>
            <i class="pi text-muted transition group-hover:text-accent" :class="copied ? 'pi-check' : 'pi-copy'" />
          </button>

          <a
            v-for="s in socials"
            :key="s.name"
            :href="s.href"
            target="_blank"
            rel="noopener"
            class="group flex items-center justify-between border-b border-line py-5 text-2xl transition hover:pl-3 hover:text-accent"
          >
            <span class="flex items-center gap-4"><i class="pi text-base" :class="s.icon" /> {{ s.name }}</span>
            <i class="pi pi-arrow-up-right text-sm transition group-hover:rotate-45" />
          </a>

          <p class="mt-auto pt-4 text-sm text-muted">⚡ I usually respond within 24 hours. For anything urgent, mention it in the subject.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const props = defineProps({ profile: Object });
const form = ref({ name: "", email: "", subject: "", message: "" });
const state = ref("idle");
const copied = ref(false);

const socials = computed(() =>
  [
    props.profile.github && { name: "GitHub", href: props.profile.github, icon: "pi-github" },
    props.profile.linkedin && { name: "LinkedIn", href: props.profile.linkedin, icon: "pi-linkedin" },
    props.profile.twitter && { name: "X / Twitter", href: props.profile.twitter, icon: "pi-twitter" },
    { name: "Résumé", href: props.profile.resume, icon: "pi-file" },
  ].filter(Boolean),
);

const copy = async () => {
  await navigator.clipboard.writeText(props.profile.email);
  copied.value = true;
  setTimeout(() => (copied.value = false), 2000);
};

const submit = async () => {
  state.value = "sending";
  try {
    const res = await fetch(`https://formsubmit.co/ajax/${props.profile.email}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...form.value, _captcha: "false" }),
    });
    if (!res.ok) throw new Error(res.statusText);
    state.value = "sent";
    form.value = { name: "", email: "", subject: "", message: "" };
  } catch {
    state.value = "error";
  }
};
</script>

<style scoped>
.field {
  display: block;
}
.field span {
  display: block;
  margin-bottom: 0.5rem;
  font-family: var(--font-mono);
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-muted);
}
.field input,
.field textarea {
  width: 100%;
  border-bottom: 1px solid var(--color-line);
  background: transparent;
  padding: 0.5rem 0;
  font-size: 1.1rem;
  outline: none;
  transition: border-color 0.3s;
  resize: none;
}
.field input:focus,
.field textarea:focus {
  border-color: var(--color-accent);
}
.field ::placeholder {
  color: rgb(139 139 152 / 0.5);
}
</style>
