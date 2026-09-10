<script setup lang="ts" generic="T extends RadioValue = RadioValue">
import type { RadioButtonEmits, RadioButtonProps, RadioButtonSlots, RadioValue } from './types';
import { loader } from '@/assets/icons/general';
import VIcon from '../VIcon.vue';

const { label = '', loading = false, modelValue = undefined, value = undefined, fluid = false, size = 'm' }
  = defineProps<RadioButtonProps<T>>();

const emit = defineEmits<RadioButtonEmits<T>>();

defineSlots<RadioButtonSlots>();

const id = useId();
const labelRef = ref<HTMLLabelElement>();
const isHovered = useElementHover(labelRef);

const width = computed(() => fluid ? '100%' : 'auto');

const model = computed({
  get() {
    return modelValue;
  },

  set(val: T) {
    emit('update:modelValue', val);
  },
});

const checked = computed(() => value !== undefined && modelValue === value);
</script>

<template>
  <label ref="labelRef" :for="id" :class="[loading && 'loading', `size-${size}`]">
    <slot name="append-top" />
    <input :id="id" v-model="model" type="radio" :value="value">
    <span class="radio">
      <VIcon
        v-if="loading"
        :icon="loader"
        color="on-surface-secondary"
      />
      <span v-else-if="checked" class="dot" />
    </span>
    <slot :is-hovered="isHovered" :label="label">
      <span v-if="label">
        {{ label }}
      </span>
    </slot>
  </label>
</template>

<style scoped lang="scss">
label {
  --border: var(--on-surface-secondary);
  --bg: transparent;
  --radio-size: 2.4rem;
  --dot-size: 1rem;
  --gap: 1.2rem;
  --font: var(--font-16-n);

  &:has(input:checked) {
    --bg: var(--on-surface);
    --border: var(--on-surface);
  }

  &:hover {
    --border: var(--on-surface);
  }

  &.size-s {
    --radio-size: 2rem;
    --dot-size: .8rem;
    --gap: .8rem;
    --font: var(--font-14-n);
  }

  display: inline-flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  width: v-bind(width);
  gap: var(--gap);
  font: var(--font);
  &.loading {
    cursor: wait;
    pointer-events: none;
  }
}

.radio {
  width: var(--radio-size);
  height: var(--radio-size);
  border: 2px solid var(--border);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  @include transition(border-color background);
}

.dot {
  width: var(--dot-size);
  height: var(--dot-size);
  border-radius: 50%;
  background: var(--bg);
  @include transition(background);
}

input {
  display: none;
}
</style>
