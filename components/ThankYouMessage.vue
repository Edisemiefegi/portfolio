<template>
  <div class="text-center py-10 px-4 space-y-4">
    <h2 class="text-4xl font-bold text-green-600">🎉 Message Sent!</h2>
    <p class="text-lg text-gray-700">
      Thank you for reaching out. I'll get back to you shortly.
    </p>
    <button
      @click="$emit('reset')"
      class="text-blue-600 underline hover:text-blue-800"
    >
      Send another message
    </button>
  </div>
</template>
