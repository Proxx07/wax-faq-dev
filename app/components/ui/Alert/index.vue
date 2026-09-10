<script setup lang="ts">
import type { AlertProps } from './types';
import { cross } from '@/assets/icons/actions';
import { attention } from '@/assets/icons/general';
import VIcon from '../VIcon.vue';

const {
  type = 'error',
  isToast = false,
  noIcon = false,
  title = '',
  description = '',
  icon = attention,
  closeTimeout = 0,
} = defineProps<AlertProps>();

const isVisible = defineModel<boolean>({ default: true });

const font = isToast ? 'font-16-n' : 'font-14-n';
const radius = isToast ? 'var(--radius-l)' : 'var(--radius-sm)';
const color = computed(() => type === 'success' ? 'secondary' : type);
const bgVar = computed(() => `var(--${color.value})`);

const closeProgressBar = ref<HTMLSpanElement>();
const animationDuration = computed(() => `${closeTimeout * 1000}ms`);

const closeHandler = () => {
  isVisible.value = false;
};

onMounted(() => {
  if (!closeProgressBar.value) return;
  closeProgressBar.value.addEventListener('animationend', closeHandler);
});

onBeforeUnmount(() => {
  if (!closeProgressBar.value) return;
  closeProgressBar.value.removeEventListener('animationend', closeHandler);
});
</script>

<template>
  <div
    v-if="isVisible"
    class="alert"
    :class="[
      `color-${color} ${font}`,
      fluid && 'w-full',
      isToast && 'is-toast',
    ]"
    :style="{ '--bg': bgVar }"
  >
    <div class="inner">
      <div v-if="title" class="title">
        <VIcon v-if="!noIcon" :icon="icon" :size="20" />
        {{ title }}
        <VIcon
          :icon="cross"
          :size="20"
          class="close-icon"
          @click="closeHandler"
        />
      </div>

      <div class="description">
        {{ description }}
      </div>
    </div>
    <VIcon
      v-if="!title"
      :icon="cross"
      :size="20"
      class="close-icon"
      @click="closeHandler"
    />
    <span
      v-if="closeTimeout"
      ref="closeProgressBar"
      class="progress"
    />
  </div>
</template>

<style scoped lang="scss">
@keyframes toast-indicator {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-100%);
  }
}

.alert {
  padding: 1.2rem;
  border-radius: v-bind(radius);
  gap: .6rem;
  display: flex;
  position: relative;
  overflow: hidden;
  background: #{mix-color-transparent(var(--bg))};
  &.is-toast {
    backdrop-filter: blur(10px);
  }
}
.inner {
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: .6rem;
  width: 100%;
}
.title {
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: .6rem;
  width: 100%;
}

.close-icon {
  cursor: pointer;
  margin-left: auto;
}

.alert:hover .progress {
  animation-play-state: paused;
}
.progress {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: currentColor;
  animation: toast-indicator v-bind(animationDuration) forwards linear;
}
</style>
