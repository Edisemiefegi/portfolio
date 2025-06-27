<template>
  <div class="relative">
    <header
      :class="[
        'fixed border-b border-gray-200 top-0 left-0 z-50 transition-all duration-300 ease-in-out w-full overflow-hidden',
        Scroll,
      ]"
    >
      <div class="w-11/12 mx-auto py-4 flex justify-between items-center">
        <div>
          <p class="font-bold text-lg">Efegi Areye Edisemi</p>
        </div>

        <div class="flex gap-8 items-center">
          <!-- Desktop Nav -->
          <div v-for="item in navLinks" :key="item" class="lg:block hidden">
            <nav class="flex gap-6 text-gray-500 font-medium text-normal">
              <a
                @click="ActiveLink(item)"
                :href="item.href"
                :class="[
                  active === item.href
                    ? 'bg-gray-300 p-2 !text-black rounded-md px-3'
                    : '',
                  'hover:text-black ease-in duration-300 hover:-translate-y-0.5 hover:scale-110 transition',
                ]"
              >
                {{ item.name }}
              </a>
            </nav>
          </div>

          <!-- Dev Mode -->
          <p
            class="hover:bg-gray-100 px-3 py-1.5 font-medium text-sm cursor-pointer rounded-md flex items-center gap-2 ease-in duration-300 hover:-translate-y-0.5 hover:scale-110 transition"
          >
            <i class="pi pi-moon"></i>
            <span class="lg:block hidden">Dev Mode</span>
          </p>

          <div class="lg:hidden block">
            <button @click="isMenuOpen = !isMenuOpen">
              <i class="pi pi-align-justify text-xl cursor-pointer"></i>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Nav -->
      <transition name="fade">
        <div
          v-if="isMenuOpen"
          class="lg:hidden px-6 pt-4 pb-6 flex flex-col space-y-4 text-gray-600 font-medium backdrop-blur-md bg-white/70"
        >
          <a
            v-for="item in navLinks"
            :key="item.href"
            @click="
              () => {
                ActiveLink(item);
                isMenuOpen = false;
              }
            "
            :href="item.href"
            :class="[
              active === item.href
                ? 'bg-gray-300 p-2 !text-black rounded-md px-3'
                : '',
              'hover:text-black ease-in duration-200 transition rounded-md',
            ]"
          >
            {{ item.name }}
          </a>
        </div>
      </transition>
    </header>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const navLinks = ref([
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Project", href: "#projects" },
  { name: "Skill", href: "#skills" },
  { name: "Playground", href: "#playground" },
  { name: "Contact", href: "#contact" },
]);

const active = ref("");
const isScrolled = ref(false);
const isMenuOpen = ref(false);

const ActiveLink = (item) => {
  active.value = item.href;
};

const Scroll = computed(() => {
  return isScrolled.value
    ? "bg-white/70 backdrop-blur-md shadow-md"
    : "bg-transparent";
});

const updateActiveLink = () => {
  for (const item of navLinks.value) {
    const section = document.querySelector(item.href);
    if (section) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 150 && rect.bottom > 150) {
        active.value = item.href;
        break;
      }
    }
  }
};

const checkScroll = () => {
  isScrolled.value = window.scrollY > 0;
  updateActiveLink();
};

onMounted(() => {
  window.addEventListener("scroll", checkScroll);
  updateActiveLink();
});

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll);
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
