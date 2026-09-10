<script setup lang="ts">
import type { CSSProperties } from 'vue';
import type { InputRangeEmits, InputRangeProps } from './types';

const {
  min = 0,
  max = 100,
  step = 1,
  fillBg = 'primary',
  disabled = false,
  showValue = false,
  modelValue = 0,
  range = false,
  from,
  to,
  fluidFill = false,
  hideValue = false,
  valuePrefix = '',
  valueSuffix = '',
  valueBg = 'surface-container',
} = defineProps<InputRangeProps>();

const emit = defineEmits<InputRangeEmits>();

const inputRangeWrapper = ref<HTMLDivElement>();
const pressed = ref(false);

const TILT_ANGLE = 20;
const TILT_THRESHOLD = 1;
const tilt = ref(0);
let lastPointerX = 0;

const { start: startTiltReset, stop: stopTiltReset } = useTimeoutFn(
  () => { tilt.value = 0; },
  120,
  { immediate: false },
);

const span = computed(() => max - min);
const decimals = computed(() => (String(step).split('.')[1] || '').length);

const clampValue = (value: number) => {
  if (span.value <= 0) return min;
  const snapped = Math.round((value - min) / step) * step + min;
  return +Math.min(max, Math.max(min, snapped)).toFixed(decimals.value);
};

const valueFromPosition = (px: number, width: number) => {
  if (span.value <= 0 || width <= 0) return min;
  return clampValue(min + (px / width) * span.value);
};

const percentOf = (value: number) => {
  if (span.value <= 0) return 0;
  return +((value - min) / span.value * 100).toFixed(2);
};

const displayValue = computed(() => clampValue(modelValue));

const fromValue = computed(() => clampValue(from ?? min));
const toValue = computed(() => clampValue(to ?? max));

const activeThumb = ref<'from' | 'to'>('from');

const pickActiveThumb = (px: number, width: number) => {
  const pointer = valueFromPosition(px, width);
  const start = fromValue.value;
  const end = toValue.value;
  if (pointer <= start) {
    activeThumb.value = 'from';
    return;
  }
  if (pointer >= end) {
    activeThumb.value = 'to';
    return;
  }
  const distanceFrom = pointer - start;
  const distanceTo = end - pointer;
  if (distanceFrom < distanceTo) activeThumb.value = 'from';
  else if (distanceTo < distanceFrom) activeThumb.value = 'to';
  else activeThumb.value = pointer < end ? 'from' : 'to';
};

const rootStyle = computed<CSSProperties>(() => ({
  '--from': `${range ? percentOf(fromValue.value) : 0}%`,
  '--to': `${percentOf(range ? toValue.value : displayValue.value)}%`,
  '--fill-bg': `var(--${fillBg})`,
  '--knob-color': `var(--${fillBg})`,
  '--tilt-from': pressed.value && range && activeThumb.value === 'from' ? `${tilt.value}deg` : '0deg',
  '--tilt-to': pressed.value && (!range || activeThumb.value === 'to') ? `${tilt.value}deg` : '0deg',
}));

const isBgGradient = computed(() => {
  return fillBg === 'float-bg' || fillBg === 'fade-bg';
});

const commitFromPx = (px: number, width: number) => {
  const next = valueFromPosition(px, width);
  if (!range) {
    if (next !== displayValue.value) emit('update:modelValue', next);
    return;
  }

  if (activeThumb.value === 'from') {
    const clamped = Math.min(next, toValue.value);
    if (clamped !== fromValue.value) emit('update:from', clamped);
  }
  else {
    const clamped = Math.max(next, fromValue.value);
    if (clamped !== toValue.value) emit('update:to', clamped);
  }
};

const pxFromEvent = (event: PointerEvent, rect: DOMRect) => {
  return Math.min(Math.max(event.clientX - rect.left, 0), rect.width);
};

const onPointerDown = (event: PointerEvent) => {
  if (disabled) return;
  const el = inputRangeWrapper.value;
  if (!el) return;

  const rect = el.getBoundingClientRect();
  const px = pxFromEvent(event, rect);

  if (range) pickActiveThumb(px, rect.width);

  pressed.value = true;
  el.setPointerCapture?.(event.pointerId);

  lastPointerX = event.clientX;
  tilt.value = 0;

  commitFromPx(px, rect.width);
};

const onPointerMove = (event: PointerEvent) => {
  if (!pressed.value || disabled) return;
  const el = inputRangeWrapper.value;
  if (!el) return;

  const rect = el.getBoundingClientRect();
  commitFromPx(pxFromEvent(event, rect), rect.width);

  const dx = event.clientX - lastPointerX;
  if (Math.abs(dx) >= TILT_THRESHOLD) {
    tilt.value = dx > 0 ? -TILT_ANGLE : TILT_ANGLE;
    lastPointerX = event.clientX;
    startTiltReset();
  }
};

const endPress = (event?: PointerEvent) => {
  if (!pressed.value) return;
  pressed.value = false;

  stopTiltReset();
  tilt.value = 0;

  const el = inputRangeWrapper.value;
  if (el && event && el.hasPointerCapture?.(event.pointerId)) {
    el.releasePointerCapture?.(event.pointerId);
  }
};

useEventListener(inputRangeWrapper, 'pointermove', onPointerMove);
useEventListener(inputRangeWrapper, 'pointerup', endPress);
useEventListener(inputRangeWrapper, 'pointercancel', endPress);
</script>

<template>
  <div
    ref="inputRangeWrapper"
    class="input-range"
    :class="[disabled && 'disabled', isBgGradient && 'exact-bg-variable']"
    :style="rootStyle"
    @pointerdown="onPointerDown"
  >
    <div class="track">
      <div class="fill" :class="[fluidFill && 'fluid']" />
    </div>

    <div v-if="range" class="knob knob-from">
      <div
        v-if="!hideValue"
        class="knob-value"
        :class="[`bg-${valueBg}`, (pressed && activeThumb === 'from' || showValue) && 'show']"
      >
        {{ valuePrefix }} {{ fromValue }} {{ valueSuffix }}
      </div>
    </div>

    <div class="knob knob-to">
      <div
        v-if="!hideValue"
        class="knob-value"
        :class="[`bg-${valueBg}`, (pressed && activeThumb === 'to' || showValue) && 'show']"
      >
        {{ valuePrefix }} {{ range ? toValue : displayValue }} {{ valueSuffix }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@mixin line-gradient($color) {
  background: linear-gradient(90deg, transparent 0%, $color 15%, $color 50%, $color 85%, transparent 100%);
}
.input-range {
  --size: 1.6rem;
  --track-h: 2px;
  --track-color: var(--outline-variant);
  --knob-border: 2px;
  position: relative;
  min-height: var(--size);
  cursor: pointer;
  touch-action: none;
  user-select: none;
  -webkit-user-select: none;
  width: calc(100% - var(--size));
  margin: 0 auto;
  &.disabled {
    opacity: .5;
    pointer-events: none;
  }
}

.track {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: var(--track-h);
  @include line-gradient(var(--track-color));
  transform: translateY(-50%);
}

.fill {
  position: absolute;
  inset-block: 0;
  left: var(--from);
  width: calc(var(--to) - var(--from));
  @include line-gradient(var(--fill-bg));
  &.fluid {
    left: 0;
    width: 100%;
  }
}

.input-range.exact-bg-variable {
  .knob {
    --knob-color: var(--on-surface);
    border-color: var(--knob-color);
    &::after {
      inset: var(--knob-border);
    }
  }
  .fill {
    background: var(--fill-bg);
  }
}

.knob {
  position: absolute;
  top: 50%;
  margin-top: calc(var(--size) / -2);
  margin-left: calc(var(--size) / -2);
  width: var(--size);
  height: var(--size);
  border: var(--knob-border) solid color-mix(in srgb, var(--knob-color) 40%, transparent);
  border-radius: 50%;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: var(--knob-color);
  }

  &-value {
    position: absolute;
    left: 50%;
    bottom: 100%;
    transform: translate(-50%, -50%) rotate(var(--tilt, 0deg));
    transform-origin: 50% 100%;
    min-width: 3.2rem;
    padding: .4rem;
    border-radius: var(--radius-sm);
    color: var(--on-surface);
    text-align: center;
    pointer-events: none;
    opacity: 0;
    @include transition(opacity transform);
    white-space: nowrap;
    &.show {
      opacity: 1;
    }
  }
}

.knob-from { left: var(--from); --tilt: var(--tilt-from, 0deg); }
.knob-to { left: var(--to); --tilt: var(--tilt-to, 0deg); }
</style>
