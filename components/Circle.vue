<template>
  <div
    class="absolute top-0 z-0 dark:z-0 left-0 w-[70vw] max-w-[700px] aspect-square rounded-full bg-[radial-gradient(circle,#0f172a_0%,#babdc2_50%,#dadada_100%)] dark:opacity-40 dark:bg-[radial-gradient(circle,#1f2937_10%,#374151_50%,#4b5563_90%)] opacity-60 blur-[60px] animate-[floatTilt_10s_ease-in-out_infinite_alternate]"
  ></div>
</template>

<style>
/* your keyframes */
@keyframes floatTilt {
  0% {
    transform: translate(0%, 0%) rotate(0deg);
  }
  25% {
    transform: translate(25vw, -10%) rotate(90deg);
  }
  50% {
    transform: translate(50vw, -50%) rotate(180deg);
  }
  75% {
    transform: translate(75vw, -10%) rotate(270deg);
  }
  100% {
    transform: translate(100%, 0%) rotate(360deg);
  }
}
</style>
