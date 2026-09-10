<script setup lang="ts">
import type { ModalEmits, ModalProps, ModalSlots } from './types';
import { cross } from '@/assets/icons/actions';
import { chevronLeft } from '@/assets/icons/arrows';
import { scrollDirectionTracker } from '@/utils';
import Button from '../Button/index.vue';

const {
  modelValue = false,
  modalBg = 'surface-container',
  maxWidth = 640,
  contentMinHeight = 0,
  noHeaderBorder = false,
  title = '',
} = defineProps<ModalProps>();

const emit = defineEmits<ModalEmits>();

defineSlots<ModalSlots>();

const closeModal = () => {
  emit('update:modelValue', false);
};

const emitBack = () => {
  emit('back');
};

let MAX_OFFSET_LIMIT = 0;
let OFFSET_DEFAULT = 0;

const modalWrapper = ref<HTMLDivElement>();
const modalInnerRef = ref<HTMLDivElement>();
const footerRef = ref<HTMLDivElement>();
const headerRef = ref<HTMLDivElement>();

const modalScrollOffset = ref(0);
const { height: windowHeight } = useWindowSize();
const { height: footerHeight } = useElementBounding(footerRef);
const { top, update, height: headerHeight } = useElementBounding(headerRef);

const [animationOffset, toggleAnimationOffset] = useToggle(false);

const recalculateOffset = (val: 'up' | 'down') => {
  if (val === 'up') {
    if (modalScrollOffset.value === MAX_OFFSET_LIMIT) return closeModal();
    toggleAnimationOffset(true);
    modalScrollOffset.value = MAX_OFFSET_LIMIT;
  }
  if (val === 'down') {
    if (modalScrollOffset.value === OFFSET_DEFAULT) return;
    toggleAnimationOffset(true);
    modalScrollOffset.value = OFFSET_DEFAULT;
  }
};

const scrollDirection = scrollDirectionTracker();
const pointerMoveHandler = (e: TouchEvent | WheelEvent) => {
  if (animationOffset.value || (e instanceof WheelEvent && !e.cancelable)) return;
  if (Math.abs(top.value - modalScrollOffset.value) > 1.5) return;
  const direction = scrollDirection(e);
  if (!direction) return;
  recalculateOffset(direction);
};

const innerTransitionEndHandler = () => {
  update();
  toggleAnimationOffset(false);
};

useEventListener(modalInnerRef, 'wheel', pointerMoveHandler);
useEventListener(modalInnerRef, 'touchmove', pointerMoveHandler);
useEventListener(modalInnerRef, 'transitionend', innerTransitionEndHandler);

useEventListener(modalWrapper, 'transitionend', (e: TransitionEvent) => {
  if (e.propertyName === 'transform') update();
});

useEventListener(document, 'keydown', (e: KeyboardEvent) => {
  if (e.key === 'Escape' && modelValue) closeModal();
});

watch(() => modelValue, () => {
  modalScrollOffset.value = OFFSET_DEFAULT = Math.floor(windowHeight.value * 0.4);
  MAX_OFFSET_LIMIT = Math.floor(OFFSET_DEFAULT * 1.6);
}, { flush: 'post' });
</script>

<template>
  <client-only>
    <Teleport to="#teleports">
      <transition name="fade">
        <div
          v-if="modelValue"
          class="backdrop"
          @click="closeModal"
        />
      </transition>

      <transition name="modal">
        <div
          v-if="modelValue"
          ref="modalWrapper"
          class="modal-wrapper"
          :style="{
            '--width': `${maxWidth + 46}px`,
            '--content-min-height': `${contentMinHeight ? contentMinHeight : '320'}px`,
            '--footer-height': `${footerHeight}px`,
            '--header-height': `${headerHeight}px`,
          }"
        >
          <div
            ref="modalInnerRef"
            class="modal-inner "
            :class="[animationOffset && 'animated-offset']"
            :style="{
              '--top-offset': `${modalScrollOffset}px`,
            }"
            @click="closeModal"
          >
            <div class="modal-dialog-outer" @click.prevent.stop>
              <div
                class="modal-dialog"
                :class="[`bg-${modalBg}`]"
              >
                <div
                  ref="headerRef"
                  class="modal-dialog__header-outer"
                >
                  <slot name="header-above" />

                  <div :class="[`bg-${modalBg}`]">
                    <slot name="header">
                      <div class="modal-dialog__header">
                        <slot name="header-inner">
                          <div
                            class="modal-dialog__header-inner"
                            :class="[!noHeaderBorder && 'with-border']"
                          >
                            <slot name="header-prepend" :emit-back="emitBack">
                              <Button
                                v-if="backButton"
                                severity="tertiary"
                                variant="text"
                                size="s"
                                class="modal-button"
                                :icon-left="chevronLeft"
                                @click="emitBack"
                              />
                            </slot>

                            <div class="font-18-m">
                              {{ title }}
                            </div>

                            <div class="header-append ml-auto">
                              <slot name="header-append">
                                <Button
                                  severity="tertiary"
                                  variant="text"
                                  size="s"
                                  class="modal-button"
                                  :icon-left="cross"
                                  @click="closeModal"
                                />
                              </slot>
                            </div>
                          </div>
                        </slot>
                      </div>
                    </slot>
                  </div>
                </div>

                <div class="modal-dialog__content">
                  <div class="modal-dialog__content-inner">
                    <slot name="content">
                      {DIALOG_CONTENT}
                    </slot>
                  </div>
                </div>

                <div
                  ref="footerRef"
                  class="modal-dialog__footer-outer"
                  :class="[`bg-${modalBg}`]"
                >
                  <slot name="footer">
                    <div class="modal-dialog__footer">
                      <slot name="footer-inner">
                        <div class="modal-dialog__footer-inner" />
                      </slot>
                    </div>
                  </slot>
                </div>
              </div>
              <Button
                severity="tertiary"
                class="close-button align-self-start"
                :bg-color="modalBg"
                :icon-right="cross"
                size="s"
                @click="closeModal"
              />
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </client-only>
</template>

<style scoped lang="scss">
.modal-enter-active,
.modal-leave-active {
  @include transition(opacity transform);
  @include media-max($mobile) {
    @include transition(opacity transform, var(--slow-timing));
  }
}
.modal-enter-from {
  opacity: 0;
  @include media-min($mobile) {
    transform: scale(.9);
  }
  @include media-max($mobile) {
    transform: translateY(100%);
  }
}
.modal-leave-to {
  opacity: 0;
  @include media-min($mobile) {
    transform: scale(1.1);
  }
  @include media-max($mobile) {
    transform: translateY(100%);
  }
}

.backdrop,
.modal-wrapper {
  position: fixed;
  z-index: 100;
  inset: 0;
}
.modal-wrapper {
  display: flex;
  pointer-events: none;
}

.modal-inner {
  width: 100%;
  height: 100%;
  max-height: 100%;
  position: relative;
  overflow: auto;
  pointer-events: all;
  will-change: padding;
  &.animated-offset {
    @include transition(padding, var(--slow-timing));
  }
  @include media-max($mobile) {
    padding-top: var(--top-offset);
  }
}

.modal-inner {
  --padding-y: 2rem;
  --padding-x: 2.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  @include media-max($mobile) {
    align-items: flex-start;
  }
}

.modal-dialog-outer {
  --min-h: 40rem;
  max-width: var(--width);
  width: 100%;
  pointer-events: all;
  gap: .6rem;

  @include media-min($mobile) {
    display: flex;
  }

  @include media-max($mobile) {
    --min-h: 60dvh;
    max-width: 100%;
    .close-button {
      display: none;
    }
  }
}
.modal-dialog {
  width: 100%;
  border-radius: var(--radius-m);
  display: flex;
  flex-direction: column;
  &__header,
  &__content,
  &__footer {
    padding-left: var(--padding-x);
    padding-right: var(--padding-x);
  }

  &__header {
    padding-top: var(--padding-y);
    &-outer {
      border-radius: var(--radius-m) var(--radius-m) 0 0;
      overflow: hidden;
      @include media-max($mobile) {
        position: sticky;
        left: 0;
        right: 0;
        top: calc(var(--top-offset) * -1);
      }
    }
    &-inner {
      &.with-border {
        border-bottom: 1px solid var(--outline);
      }
      display: flex;
      gap: 1.2rem;
      padding-bottom: var(--padding-y);
      align-items: center;
    }
    .header-append {
      &:empty {display: none}
      @include media-min($mobile) {
        display: none;
      }
    }
  }

  &__content {
    flex-grow: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding-bottom: var(--padding-y);
    @include media-max($mobile) {
      overflow-y: hidden;
      min-height: calc(var(--min-h) - var(--header-height));
      padding-bottom: calc(var(--padding-y) + var(--footer-height));
    }
    @include media-min($mobile) {
      min-height: var(--content-min-height);
      max-height: var(--content-min-height);
    }
  }

  &__footer {
    padding-top: var(--padding-y);
    padding-bottom: var(--padding-y);
    &:has(.modal-dialog__footer-inner:empty) {display: none}
    &-outer {
      border-radius: 0 0 var(--radius-m) var(--radius-m);
      @include media-max($mobile) {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        border-radius: 0;
        box-shadow: var(--footer-shadow);
      }
    }
  }

  .modal-button {
    min-width: 3.3rem;
    margin: 0 -6px;
    padding: .6rem;
  }
}
</style>
