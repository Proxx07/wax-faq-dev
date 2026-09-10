<script setup lang="ts">
import type { ListItemProps, ListItemSlots } from './types';

const { label = '', leftSlotSize = 0, rightSlotSize = 0, gap = 10 } = defineProps<ListItemProps>();

const slots = defineSlots<ListItemSlots>();

const slotLeft = computed(() => leftSlotSize ? `${leftSlotSize}px` : 'auto');
const slotRight = computed(() => rightSlotSize ? `${rightSlotSize}px` : 'auto');
</script>

<template>
  <div class="text-with-slots">
    <div v-if="slots?.prepend" class="left-slot">
      <slot name="prepend" />
    </div>
    <div class="default-slot" :class="[textSpoiler && 'spoiler']">
      <slot name="default">
        {{ label }}
      </slot>
    </div>
    <div v-if="slots?.append" class="right-slot">
      <slot name="append" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.text-with-slots {
  display: grid;
  align-items: center;
  width: 100%;
  min-width: 0;
  gap: calc(v-bind(gap) * 1px);
  grid-template-columns: auto;
  .left-slot,
  .right-slot {
    font-size: 0;
  }
  &:has(.left-slot) {
    grid-template-columns: v-bind(slotLeft) auto;
  }
  &:has(.right-slot) {
    grid-template-columns: auto v-bind(slotRight);
  }
  &:has(.left-slot):has(.right-slot) {
    grid-template-columns: v-bind(slotLeft) auto v-bind(slotRight);
  }
  .default-slot.spoiler {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }

  .left-slot,
  .right-slot {
    * {
      max-width: 100%;
    }
  }
}
</style>
