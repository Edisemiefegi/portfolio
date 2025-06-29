<template>
  <div class="h-full w-full relative">
    <div class="space-y-10 pt-16 mx-auto w-4/5 md:w-11/12">
      <div class="text-center space-y-8">
        <h1 class="md:text-7xl text-4xl font-bold">Let's Build Together</h1>
        <p class="text-gray-700 dark:text-gray-400">
          Got a project in mind? A crazy idea that needs bringing to life? Or
          just want to chat about the latest in web development? I'm all ears!
          👂
        </p>
      </div>

      <div class="md:flex-row flex flex-col gap-6">
        <!-- send message -->
        <div
          v-if="!messageSent"
          class="border z-20 w-full md:w-3/6 h-fit rounded-md border-gray-200 dark:border-gray-600 p-6 text-sm space-y-6"
        >
          <p class="font-medium text-2xl">Send me a message</p>
          <form @submit.prevent="submitForm" class="flex flex-col gap-6 w-full">
            <div class="grid grid-cols-2 gap-6 w-full">
              <Input
                v-model="form.name"
                name="name"
                placeholder="Your name"
                label="name"
                required
              />

              <Input
                v-model="form.email"
                name="email"
                type="email"
                placeholder="Your@email.com"
                label="Email"
                required
              />
            </div>
            <Input
              v-model="form.subject"
              name="subject"
              placeholder="What's this about?"
              label="Subject"
              required
            />
            <input type="hidden" name="_captcha" value="false" />

            <div>
              <p>Message</p>
              <input
                v-model="form.message"
                name="message"
                required
                placeholder="Tell  me about your project, idea, or just say hi!"
                class="outline-none dark:border-gray-600 w-full h-20 p-2 mt-2 rounded-sm border border-gray-100"
              />
            </div>

            <Button :bg="'dark:bg-white'" :text-color="'dark:text-black'"
              >Send Message</Button
            >
          </form>
        </div>

        <ThankYouMessage
          class="z-20 cursor-pointer"
          v-else
          @reset="resetForm"
        />

        <div class="md:w-3/6 z-20 w-full flex flex-col gap-6">
          <!-- quick connect -->
          <div
            class="border dark:border-gray-600 w-full rounded-md border-gray-200 p-6 text-sm space-y-6"
          >
            <p class="font-medium text-2xl">Quick Connect</p>
            <div class="flex flex-col gap-6 w-full">
              <Button
                class="w-full text-start"
                :bg="'bg-gray-100 dark:bg-gray-600'"
                :text-color="'text-black dark:text-white'"
                @click="copyEmail"
              >
                <i class="pi pi-envelope"></i>
                {{ email }}
              </Button>
              <Button
                class="w-full text-start"
                :bg="'bg-gray-100 dark:bg-gray-600'"
                :text-color="'text-black dark:text-white'"
              >
                <a :href="resumeLink">
                  <i class="pi pi-download mr-1"> </i
                  ><span>Download Resume</span>
                </a>
              </Button>
            </div>
          </div>

          <!-- find me online -->
          <div
            class="border dark:border-gray-600 z-20 w-full rounded-md border-gray-200 p-6 text-sm space-y-6"
          >
            <p class="font-medium text-2xl">Find me online</p>
            <div class="flex gap-8 w-full">
              <a
                v-for="item in handles"
                :key="item.link"
                :href="item.link"
                target="_blank"
                class="w-3/6 p-8 flex flex-col gap-2 cursor-pointer items-center justify-center rounded-sm dark:bg-gray-600 dark:text-white dark:hover:bg-gray-700 hover:bg-gray-300 bg-gray-100"
              >
                <i :class="item.icon"></i>

                {{ item.name }}
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- response time  -->
      <div
        class="border dark:border-gray-600 dark:text-white w-full rounded-md border-gray-200 p-6 text-sm space-y-6 text-center"
      >
        <p class="font-medium text-2xl">⚡ Response Time</p>
        <p>
          I typically respond within 24 hours. For urgent projects, feel free to
          mention it in your message!
        </p>
      </div>
    </div>

    <div class="!w-[100%] h-full absolute top-0 left-0 overflow-hidden">
      <Circle />
    </div>
  </div>
</template>

<script setup>
const email = "edisemiefegi@gmail.com";
const resumeLink = "/Resume.pdf";
const messageSent = ref(false);

const handles = ref([
  {
    name: "Github",
    link: "https://github.com/Edisemiefegi",
    icon: "pi pi-github",
  },
  {
    name: "LinkedIn",
    link: "https://linkedin.com/in/efegi-edisemi",
    icon: "pi pi-linkedin",
  },
]);

const form = ref({
  name: "",
  email: "",
  subject: "",
  message: "",
});

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(email);
    alert("Email copied to clipboard!");
  } catch (err) {
    alert("Failed to copy email.");
  }
};

const submitForm = async () => {
  try {
    await fetch("https://formsubmit.co/ajax/edisemiefegi@gmail.com", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form.value),
    });

    messageSent.value = true;
    form.value = { name: "", email: "", subject: "", message: "" };
  } catch (error) {
    alert("Something went wrong. Please try again.");
    console.error(error);
  }
};

const resetForm = () => {
  messageSent.value = false;
};
</script>

<style lang="scss" scoped></style>
