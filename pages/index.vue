<template>
  <main class="flex flex-col dark:bg-gray-800 dark:text-white">
    <Navbar />
    <section id="home">
      <sectionsHome />
    </section>

    <section id="about" class="mx-auto container xl:px-0 px-4">
      <sectionsAbout />
    </section>

    <section id="projects" class="mx-auto xl:px-0 px-4 container">
      <sectionsProject />
    </section>

    <section id="skills" class="mx-auto xl:px-0 px-4">
      <sectionsSkills />
    </section>

    <!-- <section id="playground">
      <sectionsPlayGround />
    </section> -->

    <section id="contact" class="py-10">
      <sectionsContact />
    </section>
  </main>
</template>

<script setup></script>
<style>
html {
  scroll-behavior: smooth;
}
</style>
