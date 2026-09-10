<script setup lang="ts">
import type { AccordionEmits, AccordionProps, AccordionSlots } from './types';
import { chevronDown } from '@/assets/icons/arrows';
import Button from '../Button/index.vue';

const {
  title = '',
  opened = false,
} = defineProps<AccordionProps>();

const emit = defineEmits<AccordionEmits>();

defineSlots<AccordionSlots>();

const isOpened = ref(opened);

const handleOpen = () => {
  isOpened.value = !isOpened.value;
  if (isOpened.value) return emit('after-open');
  return emit('after-close');
};

const isMounted = ref(false);
const body = ref<HTMLDivElement>();
const { height } = useElementBounding(body);

onMounted(() => {
  isMounted.value = true;
});
</script>

<template>
  <div class="filter">
    <Button
      :label="title"
      :icon-right="chevronDown"
      :rotate-right-icon="isOpened"
      severity="tertiary"
      variant="text"
      padding="14px 0 15px"
      size="l"
      class="accordion-button"
      no-hover-bg
      fluid
      @click="handleOpen"
    />
    <div
      class="body-wrapper"
      :class="[isOpened && 'opened']"
      :style="{ '--height': !isMounted ? 'auto' : `${Math.round(height)}px` }"
    >
      <transition name="accordion-body">
        <div v-if="isOpened" ref="body" class="body">
          <slot name="default" />
        </div>
      </transition>
      <transition name="slide-down">
        <div
          v-if="!isOpened && $slots.slotForClosed"
          ref="body"
          class="body color-on-surface-tertiary"
        >
          <slot name="slotForClosed" />
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.filter {
  .body-wrapper {
    position: relative;
    height: var(--height);
    transition-delay: .2s;
    @include transition(height);

    &.opened {
      transition-delay: 0s;
    }
  }

  .body:has(+ .body) {
    position: absolute;
    left: 0;
    right: 0;
  }
}

.accordion-body-enter-active,
.accordion-body-leave-active {
  @include transition(opacity transform, var(--slow-timing));
}

.accordion-body-enter-from,
.accordion-body-leave-to {
  opacity: 0;
  transform: translateX(-20%);
}

.accordion-button {
  font: var(--font-18-m);
  --icon-color: var(--on-surface-tertiary);
  &:hover { --icon-color: var(--on-surface) };
  :deep(.icon) {
    color: var(--icon-color) !important;
  }
}
</style>
