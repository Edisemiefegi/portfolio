<template>
  <div class="flex flex-col gap-12">
    <div>
      <Navbar />
      <section id="home">
        <sectionsHome />
      </section>
    </div>

    <section id="about">
      <sectionsAbout />
    </section>

    <section id="projects">
      <sectionsProject />
    </section>

    <section id="skills">
      <sectionsSkills />
    </section>

    <!-- <section id="playground">
      <sectionsPlayGround />
    </section> -->

    <section id="contact" class="mb-20">
      <sectionsContact />
    </section>
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
