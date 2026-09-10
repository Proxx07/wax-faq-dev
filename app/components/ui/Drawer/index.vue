<script setup lang="ts">
import type { DrawerEmits, DrawerProps, DrawerSlots } from './types';
import { cross } from '@/assets/icons/actions';
import Button from '../Button/index.vue';

const {
  modelValue = false,
  position = 'left',
  offsetTop = '0px',
  drawerBg = 'surface-container',
  title = '',
  hideHeader = false,
} = defineProps<DrawerProps>();

const emit = defineEmits<DrawerEmits>();

defineSlots<DrawerSlots>();

const close = () => {
  emit('update:modelValue', false);
};
useEventListener(document, 'keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape' && modelValue) close();
});
</script>

<template>
  <client-only>
    <Teleport to="#teleports">
      <transition name="fade">
        <div
          v-if="modelValue"
          class="backdrop"
          :style="{ '--top': offsetTop }"
          @click="close"
        />
      </transition>
      <transition :name="`drawer-${position}`">
        <div
          v-if="modelValue"
          class="drawer-wrapper"
          :style="{ '--top': offsetTop }"
          :class="[`position-${position}`]"
        >
          <div
            class="drawer"
            :class="[`bg-${drawerBg}`]"
          >
            <div v-if="!hideHeader" class="drawer__header">
              <slot name="header" :close="close">
                {{ title }}
                <Button
                  :icon-left="cross"
                  severity="tertiary"
                  variant="text"
                  size="s"
                  class="ml-auto"
                  @click="close"
                />
              </slot>
            </div>
            <div class="drawer__content">
              <slot name="default" :close="close" />
            </div>
            <div class="drawer__footer">
              <slot name="footer" />
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </client-only>
</template>

<style scoped lang="scss">
.drawer-left-enter-active,
.drawer-left-leave-active,
.drawer-right-enter-active,
.drawer-right-leave-active {
  transition: transform .4s;
}

.drawer-left-enter-from,
.drawer-left-leave-to {
  transform: translateX(-100%);
}

.drawer-right-enter-from,
.drawer-right-leave-to {
  transform: translateX(100%);
}

.backdrop,
.drawer-wrapper {
  position: fixed;
  inset: 0;
  z-index: 10;
  top: var(--top);
}

.drawer-wrapper {
  display: flex;
  pointer-events: none;
  &.position-left {
    justify-content: flex-start;
  }
  &.position-right {
    justify-content: flex-end;
  }
}

.drawer {
  --padding-y: 1.2rem;
  --padding-x: 2rem;

  max-width: 40rem;
  width: 100%;
  height: 100%;
  pointer-events: all;
  display: flex;
  flex-direction: column;
  &__header,
  &__footer,
  &__content {
    padding: var(--padding-y) var(--padding-x);
  }

  &__header {
    border-bottom: 1px solid var(--outline);
    display: flex;
    gap: 1.2rem;
    align-items: center;
    font: var(--font-20-m);
    @include media-max($mobile) {
      font: var(--font-18-n);
    }
    &:empty {
      display: none;
    }
  }

  &__content {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
  }

  &__footer {
    border-top: 1px solid var(--outline);
    &:empty {
      display: none;
    }
  }
}
</style>
