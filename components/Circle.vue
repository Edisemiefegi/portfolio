<template>
  <div class="circle dark:circle-dark"></div>
</template>

<style>
.circle {
  position: absolute;
  top: 0%;
  left: 0;
  width: 70vw;
  max-width: 700px;
  aspect-ratio: 1;
  border-radius: 50%;
  background: radial-gradient(circle, #0f172a 0%, #babdc2 50%, #dadada 100%);
  opacity: 0.6;
  filter: blur(60px);
  animation: floatTilt 10s ease-in-out infinite alternate;
  z-index: -1;
}
.circle-dark {
  background: radial-gradient(circle, #dbe0e6 0%, #e5e7eb 50%, #f3f4f6 100%);
}

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
