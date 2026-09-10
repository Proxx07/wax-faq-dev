<script setup lang="ts">
import type { TooltipProps, TooltipSlots } from './types';

const {
  text = '',
  position = 'bottom',
  background = 'surface-low-container',
  color = 'on-surface',
  maxWidth = 0,
  size = 'm',
} = defineProps<TooltipProps>();

defineSlots<TooltipSlots>();

const ARROW_ANCHOR = {
  top: { '--arrow-left': '50%', '--arrow-top': '100%' },
  bottom: { '--arrow-left': '50%', '--arrow-top': '0' },
  left: { '--arrow-left': '100%', '--arrow-top': '50%' },
  right: { '--arrow-left': '0', '--arrow-top': '50%' },
};

const tooltipWrapper = ref<HTMLDivElement>();
const tooltipInner = ref<HTMLDivElement>();

const isHovered = useElementHover(tooltipWrapper);
const { isOutside } = useMouseInElement(tooltipInner);
const { left, top, width, height, update: wrapperUpdate } = useElementBounding(tooltipWrapper);
const { width: tipWidth, height: tipHeight, update: innerUpdate } = useElementBounding(tooltipInner);

const isTooltipVisible = ref(false);

const CLOSE_DELAY = 50;
let closeTimer: ReturnType<typeof setTimeout> | undefined;

watch([isHovered, isOutside], ([hovered, outside]) => {
  clearTimeout(closeTimer);
  if (hovered || !outside) {
    wrapperUpdate();
    innerUpdate();
    isTooltipVisible.value = true;
  }
  else {
    closeTimer = setTimeout(() => {
      isTooltipVisible.value = false;
    }, CLOSE_DELAY);
  }
});

onScopeDispose(() => clearTimeout(closeTimer));

const tooltipPosition = computed(() => {
  const centerX = left.value + width.value / 2;
  const centerY = top.value + height.value / 2;

  let x = centerX - tipWidth.value / 2;
  let y = centerY - tipHeight.value / 2;

  if (position === 'top') {
    y = top.value - tipHeight.value;
  }
  else if (position === 'bottom') {
    y = top.value + height.value;
  }
  else if (position === 'left') {
    x = left.value - tipWidth.value;
  }
  else if (position === 'right') {
    x = left.value + width.value;
  }

  return { '--x': `${x}px`, '--y': `${y}px` };
});

const arrowPosition = computed(() => ARROW_ANCHOR[position]);
</script>

<template>
  <div ref="tooltipWrapper" class="tooltip-wrapper">
    <slot />
    <client-only>
      <Teleport to="#teleports">
        <transition :name="`tooltip-${position}`">
          <div
            v-if="isTooltipVisible"
            ref="tooltipInner"
            class="tooltip-inner"
            :style="[
              tooltipPosition,
              arrowPosition,
              {
                '--max-width': maxWidth ? `${maxWidth}px` : 'unset',
                '--arrow': size === 's' ? '0.45rem' : '0.9rem',
                '--padding': size === 's' ? '.8rem' : '1.2rem',
                '--font': size === 's' ? 'var(--font-12-n)' : 'var(--font-14-n)',
              },
            ]"
          >
            <div class="tooltip-content" :class="[`bg-${background}`, `color-${color}`]">
              <span class="arrow" :class="[`bg-${background}`]" />
              <slot name="content">
                {{ text }}
              </slot>
            </div>
          </div>
        </transition>
      </Teleport>
    </client-only>
  </div>
</template>

<style scoped lang="scss">
.tooltip-wrapper {
  display: inline-block;
}
.tooltip-inner {
  position: fixed;
  top: var(--y);
  left: var(--x);
  max-width: var(--max-width);
  z-index: 10;
  padding: .8rem 0;
}

.tooltip-content {
  padding: var(--padding);
  position: relative;
  border-radius: var(--radius-sm);
  font: var(--font);
  .arrow {
    position: absolute;
    width: var(--arrow);
    height: var(--arrow);
    left: var(--arrow-left, 50%);
    top: var(--arrow-top, 0);
    transform: translate(-50%, -50%) rotate(45deg);
    pointer-events: none;
  }
}

[class*="enter"],
[class*="leave"] {
  @include transition(opacity transform);
}
[class*="enter-from"],
[class*="leave-to"] {
  opacity: 0;
}

.tooltip-bottom-enter-from { transform: translateY(15px) }
.tooltip-bottom-leave-to { transform: translateY(-15px) }

.tooltip-top-enter-from { transform: translateY(-15px) }
.tooltip-top-leave-to { transform: translateY(15px) }

.tooltip-left-enter-from { transform: translateX(-15px) }
.tooltip-left-leave-to { transform: translateX(15px) }

.tooltip-right-enter-from { transform: translateX(15px) }
.tooltip-right-leave-to { transform: translateX(-15px) }
</style>
