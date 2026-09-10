<script setup lang="ts">
import type { PopoverProps, PopoverSlots } from './types';

const {
  width,
  gap = 8,
  bg = 'surface-high-container',
  disabled = false,
  stayOnScroll = false,
  target,
} = defineProps<PopoverProps>();

defineSlots<PopoverSlots>();

const isOpened = defineModel<boolean>({ default: false });

const MARGIN = 8;

const popover = ref<HTMLElement>();
const content = ref<HTMLElement>();
const dropUp = ref(false);

const positions = reactive({ x: '', y: '' });

const { left, top, bottom, update } = useElementBounding(target || popover);

const widthVar = computed(() => {
  if (width == null) return 'max-content';
  return typeof width === 'number' ? `${width}px` : width;
});

const updatePosition = () => {
  if (!content.value) return;

  const contentWidth = content.value.offsetWidth;
  const contentHeight = content.value.offsetHeight;
  const spaceBelow = window.innerHeight - bottom.value;

  dropUp.value = (contentHeight + gap > spaceBelow) && (top.value > spaceBelow);

  positions.y = dropUp.value
    ? `${window.innerHeight - top.value + gap}px`
    : `${bottom.value + gap}px`;

  const minX = MARGIN;
  const maxX = window.innerWidth - contentWidth - MARGIN;
  positions.x = `${Math.min(Math.max(left.value, minX), Math.max(minX, maxX))}px`;
};

const open = () => {
  if (disabled || isOpened.value) return;
  isOpened.value = true;
};

const close = () => {
  isOpened.value = false;
};

const toggle = () => {
  if (isOpened.value) return close();
  open();
};

watch(isOpened, (opened) => {
  if (!opened) return;
  update();
  nextTick(updatePosition);
});

onClickOutside(target || popover, () => {
  close();
}, { ignore: [content] });

useEventListener('scroll', (e) => {
  if (stayOnScroll || content.value?.contains(e.target as Node)) return;
  close();
}, { capture: true, passive: true });

useEventListener('keydown', (e) => {
  if (e.key === 'Escape') close();
});
</script>

<template>
  <div ref="popover" class="popover-wrapper" @click="toggle">
    <slot
      name="target"
      :open="open"
      :close="close"
      :toggle="toggle"
      :is-open="isOpened"
    />
    <client-only>
      <Teleport to="#teleports">
        <transition name="slide-up">
          <div
            v-if="isOpened"
            ref="content"
            class="popover"
            :class="[`bg-${bg}`, dropUp && 'open-to-top']"
            :style="{
              '--x': positions.x,
              '--y': positions.y,
              '--w': widthVar,
            }"
          >
            <slot :close="close" />
          </div>
        </transition>
      </Teleport>
    </client-only>
  </div>
</template>

<style scoped lang="scss">
.popover-wrapper {
  display: inline-block;
}

.popover {
  position: fixed;
  top: var(--y);
  left: var(--x);
  width: var(--w);
  min-height: 15rem;
  max-width: calc(100vw - 16px);
  max-height: calc(70vh - 16px);
  overflow-y: auto;
  z-index: 10;
  padding: 0.8rem;
  border: 1px solid var(--outline);
  border-radius: var(--radius-xl);
  &.open-to-top {
    top: auto;
    bottom: var(--y);
  }
}
</style>
