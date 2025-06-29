<template>
  <main class="flex flex-col dark:bg-gray-800 dark:text-white">
    <Navbar />
    <section id="home">
      <sectionsHome />
    </section>

    <section id="about" class="mx-auto md:w-11/12 w-4/5">
      <sectionsAbout />
    </section>

    <section id="projects" class="mx-auto md:w-11/12 w-4/5">
      <sectionsProject />
    </section>

    <section id="skills" class="mx-auto md:w-11/12 w-4/5">
      <sectionsSkills />
    </section>

    <!-- <section id="playground">
      <sectionsPlayGround />
    </section> -->

    <section id="contact" class="mb-20">
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
