<template>
  <div class="h-full w-full relative">
    <div class="mx-auto w-11/12 space-y-10 pt-6">
      <div class="text-center space-y-8">
        <h1 class="md:text-7xl text-4xl font-bold">Let's Build Together</h1>
        <p class="text-gray-700">
          Got a project in mind? A crazy idea that needs bringing to life? Or
          just want to chat about the latest in web development? I'm all ears!
          👂
        </p>
      </div>

      <div class="md:flex-row flex flex-col gap-6">
        <!-- send message -->
        <div
          v-if="!messageSent"
          class="border z-20 w-full md:w-3/6 h-fit rounded-md border-gray-200 p-6 text-sm space-y-6"
        >
          <p class="font-medium text-2xl">Send me a message</p>
          <form @submit.prevent="submitForm" class="flex flex-col gap-8 w-full">
            <div class="flex gap-6">
              <div>
                <p class="font-medium">Name</p>
                <input
                  v-model="form.name"
                  required
                  name="name"
                  placeholder="Your name"
                  class="outline-none mt-2 w-full p-2 rounded-sm border border-gray-100"
                />
              </div>
              <div>
                <p>Email</p>
                <input
                  v-model="form.email"
                  required
                  name="email"
                  type="email"
                  placeholder="Your@email.com"
                  class="outline-none p-2 mt-2 rounded-sm border border-gray-100"
                />
              </div>
            </div>
            <div>
              <p>Subject</p>
              <input
                v-model="form.subject"
                required
                name="subject"
                placeholder="What's this about?"
                class="outline-none w-full p-2 mt-2 rounded-sm border border-gray-100"
              />
            </div>
            <input type="hidden" name="_captcha" value="false" />

            <div>
              <p>Message</p>
              <input
                v-model="form.message"
                name="message"
                required
                placeholder="Tell  me about your project, idea, or just say hi!"
                class="outline-none w-full h-20 p-2 mt-2 rounded-sm border border-gray-100"
              />
            </div>

            <Button>Send Message</Button>
          </form>
        </div>

        <ThankYouMessage
          class="z-20 cursor-pointer"
          v-else
          @reset="resetForm"
        />

        <!-- quick connect -->
        <div class="md:w-3/6 z-20 w-full flex flex-col gap-6">
          <div
            class="border w-full rounded-md border-gray-200 p-6 text-sm space-y-6"
          >
            <p class="font-medium text-2xl">Quick Connect</p>
            <div class="flex flex-col gap-8 w-full">
              <Button
                class="w-full mt-2"
                :bg="'bg-gray-100'"
                :text-color="'text-black'"
                @click="copyEmail"
              >
                <i class="pi pi-envelope"></i>
                {{ email }}
              </Button>
              <a
                :href="resumeLink"
                class="w-full mt-2 bg-gray-100 text-center p-2 rounded-md"
              >
                <i class="pi pi-download"> Download Resume</i>
              </a>
            </div>
          </div>

          <!-- find me online -->
          <div
            class="border z-20 w-full rounded-md border-gray-200 p-6 text-sm space-y-6"
          >
            <p class="font-medium text-2xl">Find me online</p>
            <div class="flex gap-8 w-full">
              <a
                href="https://github.com/Edisemiefegi"
                target="_blank"
                class="w-3/6 p-8 flex flex-col gap-2 cursor-pointer items-center justify-center rounded-sm bg-gray-100"
              >
                <i class="pi pi-github"></i>

                Github
              </a>

              <a
                href="https://linkedin.com/in/efegi-edisemi"
                target="_blank"
                class="w-3/6 p-8 flex cursor-pointer flex-col gap-2 items-center justify-center rounded-sm bg-gray-100"
              >
                <i class="pi pi-linkedin"></i>
                LinkedIn
              </a>
            </div>
          </div>

          <!-- response time  -->
          <div
            class="border w-full rounded-md border-gray-200 p-6 text-sm space-y-6"
          >
            <p class="font-medium text-2xl">⚡ Response Time</p>
            <p>
              I typically respond within 24 hours. For urgent projects, feel
              free to mention it in your message!
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="w-full h-full absolute top-0 left-0 overflow-hidden">
      <Circle />
    </div>
  </div>
</template>

<script setup>
const email = "edisemiefegi@gmail.com";
const resumeLink = "/Resume.pdf";
const messageSent = ref(false);

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
