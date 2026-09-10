<script setup lang="ts" generic="T, V extends keyof T">
import type { TabEmits, TabProps, TabSlots, TabValue } from './types';
import { UseElementBounding } from '@vueuse/components';

const {
  size = 'm',
  items = [],
  loading = false,
  noBorder = false,
  value, modelValue, itemLabel,
} = defineProps<TabProps<T, V>>();

const emit = defineEmits<TabEmits<T, V>>();

defineSlots<TabSlots<T>>();

const tabsWrapper = ref<HTMLDivElement>();
const { left: wrapperLeft } = useElementBounding(tabsWrapper);

const position = reactive({ width: 0, x: -1 });
const selectedIndex = ref<number>(modelValue ? items.findIndex(item => (value ? item[value] : item) === (modelValue as T | T[V])) : -1);

const updatePosition = ({ w, l }: { w: number, l: number }) => {
  position.width = w;
  position.x = l - wrapperLeft.value;
};

const updateModelValue = (i: number, bounds?: { width: number, left: number }) => {
  if (loading) return;
  selectedIndex.value = i;
  if (bounds) updatePosition({ w: bounds.width, l: bounds.left });
  const item = items[i];
  if (!item) return;
  emit('update:modelValue', (value ? item[value] : item) as TabValue<T, V>);
};
</script>

<template>
  <div
    ref="tabsWrapper"
    class="tabs"
    :class="[loading && 'loading', fluid && 'w-full', noBorder && 'no-border']"
    :style="{ '--w': `${position.width}px`, '--x': `${position.x}px` }"
  >
    <UseElementBounding
      v-for="(item, i) in items"
      v-slot="{ width, left }"
      :key="i"
    >
      <div
        class="tab"
        :class="[
          selectedIndex === i && 'active',
          `size-${size}`,
          selectedIndex === i && position.x < 0 && 'active-bottom',
        ]"
        @click="updateModelValue(i, { width, left })"
      >
        <slot
          name="item"
          :item="item"
          :is-selected="selectedIndex === i"
        >
          <button>
            <slot
              name="itemInner"
              :item="item"
              :is-selected="selectedIndex === i"
            >
              {{ itemLabel ? String(item[itemLabel as keyof T]) : String(item) }}
            </slot>
          </button>
        </slot>
      </div>
    </UseElementBounding>
  </div>
</template>

<style scoped lang="scss">
.tabs {
  display: inline-flex;
  border-bottom: 1px solid var(--outline);
  position: relative;
  gap: 3.2rem;
  &.no-border {
    border-bottom: none;
  }
  &:has(.tab.size-l) {
    gap: 4.8rem;
  }
  &:before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    background: var(--secondary);
  }

  &:not(&.loading) {
    &:before {
      width: var(--w);
      transform: translateX(var(--x));
      @include transition(transform width);
    }

    .tab.active-bottom  {
      &:before {
        content: '';
        position: absolute;
        bottom: 0;
        height: 2px;
        left: 0;
        right: 0;
        background: var(--secondary);
      }
    }
  }

  &.loading {
    cursor: wait;
    * {
      pointer-events: none;
    }
    &:before {
      left: 0;
      right: 0;
      animation: lineLoader 1.3s ease-in-out infinite;
    }
  }

  &:has(.tab:not(.active):hover) {
    .tab.active {
        --color: var(--on-surface-tertiary);
    }
  }

  .tab {
    position: relative;
    --color: var(--on-surface-tertiary);
    --hover-color: var(--on-surface);
    &.size-s {
      --font: var(--font-16-n);
      --padding: 0 0 1.6rem;
    }
    &.size-m {
      --font: var(--font-18-n);
      --padding: 0 0 1.5rem;
    }
    &.size-l {
      --font: var(--font-20-n);
      --padding: 0 0 2.4rem;
    }
    &.active {
      --color: var(--on-surface);
    }
  }
}

button {
  color: var(--color);
  font: var(--font);
  padding: var(--padding);
  @include transition(color);
  &:hover {
    color: var(--hover-color);
  }
}
</style>
