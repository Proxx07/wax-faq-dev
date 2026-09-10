<script setup lang="ts">
import type { TColors } from '@/utils';

const props = defineProps<{
  icon: string // svg icons from asset
  spanBg?: TColors
  color?: TColors
  noFill?: boolean
  size?: number
}>();

const colorVal = computed(() => props.color ? `var(--${props.color})` : 'currentColor');
const background = computed(() => props.spanBg ? `var(--${props.spanBg})` : 'transparent');
const iconSize = computed(() => props.size ? `${props.size}px` : 'auto');
</script>

<template>
  <span
    :style="{ color: colorVal, background }"
    :class="[noFill && 'no-fill']"
    v-html="props.icon"
  />
</template>

<style scoped lang="scss">
span {
  display: inline-flex;
  font-size: 0;
  overflow: hidden;
  text-align: center;
  :deep(svg) {
    width: v-bind(iconSize);
    height: v-bind(iconSize);
    max-width: 100%;
    max-height: 100%;
    transition: var(--transition-fast);

    &[fill]:not([fill='none']) {
      fill: currentColor;
    }
  }
  &:not(.no-fill) {
    :deep(svg) {
      [fill]:not([fill='none'], .no-fill) {
        fill: currentColor;
      }
      [stroke]:not([stroke='none'], .no-fill) {
        stroke: currentColor;
      }
    }
  }
}
</style>
