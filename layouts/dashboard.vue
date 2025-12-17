<template>
  <main class="w-screen h-full">
    <Navbar :nav-links="navLinks" />
    <div class="pt-26">
      <div class="px-8 text-end">
        <!-- <Button @click="logout">Logout</Button> -->
      </div>
      <slot />
    </div>
  </main>
</template>

<script setup>


const navLinks = [
  { name: "Overview", href: "/dashboard/overview" },
  { name: "Project", href: "/dashboard/projects" },
  { name: "About", href: "/dashboard/about" },
];
</script>

<style lang="scss" scoped></style>
