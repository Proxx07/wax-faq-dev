<script setup lang="ts">
const { count = 3 } = defineProps<{
  count?: number
}>();
</script>

<template>
  <span class="dot-loader">
    <span
      v-for="i in count"
      :key="i"
      :style="{ '--i': `${(i - 1) * 150}ms` }"
    />
  </span>
</template>

<style scoped lang="scss">
.dot-loader {
  display: inline-flex;
  gap: .3rem;
  span {
    width: .6em;
    height: .6em;
    border-radius: 50%;
    background: currentColor;
    animation: dots-animation 1s infinite ease-in-out;
    animation-delay: var(--i);
  }
}

@keyframes dots-animation {
  0%, 100% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(0);
    opacity: 0;
  }
}
</style>
