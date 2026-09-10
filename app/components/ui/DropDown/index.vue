<script setup lang="ts" generic="T, V extends keyof T = never">
import type { DropDownEmits, DropDownExposes, DropDownProps, DropDownSlots, DropDownValue } from './types';
import { vElementHover } from '@vueuse/components';
import { chevronDown } from '@/assets/icons/arrows';
import Button from '../Button/index.vue';

const {
  size = 'm',
  value,
  modelValue,
  items = [],
  itemLabel,
  label = 'Nothing to show',
  downIcon = chevronDown,
  hideDownIcon = false,
  toggleOnHover = false,
  loading = false,
  dropDownBg = 'surface-high-container',
  noToggleEmptyList = false,
  disabled = false,
} = defineProps<DropDownProps<T, V>>();

const emit = defineEmits<DropDownEmits<T, V>>();

defineSlots<DropDownSlots<T>>();

const GAP = 8;
const [isOpen, toggle] = useToggle();
const canHover = useMediaQuery('(hover: hover) and (pointer: fine)');

const dropdown = ref<HTMLElement>();
const dropdownList = ref<HTMLElement>();

const dropUp = ref(false);
const positions = reactive({ x: '', y: '', w: '' });
const { left, width, top, bottom, update } = useElementBounding(dropdown);

const selectedItem = computed<T | undefined>(() => {
  if (modelValue == null) return undefined;
  const model = modelValue as T | T[V];
  return value ? items.find(item => item[value] === model) : (model as T);
});

const targetText = computed(() => {
  if (!selectedItem.value) return modelValue ?? label;
  return itemLabel ? String(selectedItem.value[itemLabel]) : String(selectedItem.value);
});

const updatePosition = () => {
  if (!dropdownList.value) return;

  const listHeight = dropdownList.value.offsetHeight;
  const spaceBelow = window.innerHeight - bottom.value;

  dropUp.value = (listHeight + GAP > spaceBelow) && (top.value > spaceBelow);

  positions.x = `${left.value}px`;
  positions.w = `${width.value}px`;
  positions.y = dropUp.value
    ? `${window.innerHeight - top.value + GAP}px`
    : `${bottom.value + GAP}px`;
};

const { isOutside } = useMouseInElement(dropdownList);

const openDropDown = async () => {
  if (noToggleEmptyList && !items.length) return;
  if (loading || isOpen.value) return;
  update();
  toggle(true);
  await nextTick();
};

const closeDropDown = () => {
  toggle(false);
};

const toggleDropDown = () => {
  if (isOpen.value) closeDropDown();
  else openDropDown();
};

const targetHoverHandler = (isHovered: boolean) => {
  if (!toggleOnHover || !canHover.value) return;
  if (isHovered) {
    openDropDown();
  }
  else {
    setTimeout(() => {
      if (isOutside.value) closeDropDown();
    }, 100);
  }
};

const selectItem = (item: T) => {
  emit('update:modelValue', (value ? item[value] : item) as DropDownValue<T, V>);
  closeDropDown();
};

onClickOutside(dropdown, () => {
  closeDropDown();
}, { ignore: [dropdownList] });

useEventListener('scroll', (e) => {
  if (!isOpen.value) return;
  if (dropdownList.value?.contains(e.target as Node)) return;
  closeDropDown();
});

watch(isOutside, (value) => {
  if (!toggleOnHover || !canHover.value) return;
  if (value) closeDropDown();
});

const { height } = useElementBounding(dropdownList);
watch(height, updatePosition);

defineExpose<DropDownExposes>({
  openDropDown,
  closeDropDown,
});
</script>

<template>
  <div ref="dropdown" class="dropdown-wrapper">
    <slot
      name="target"
      :open-drop-down="openDropDown"
      :close-drop-down="closeDropDown"
      :toggle-drop-down="toggleDropDown"
      :is-opened="isOpen"
      :selected="selectedItem"
      :down-icon="downIcon"
      :loading="loading"
    >
      <Button
        v-element-hover="targetHoverHandler"
        bg-color="surface-high-container"
        hover-bg-color="surface-highest-container"
        :size="size"
        :icon-right="hideDownIcon ? undefined : downIcon"
        fluid
        :disabled="disabled"
        :loading="loading"
        :rotate-right-icon="isOpen"
        @click="toggleDropDown"
      >
        <slot name="targetInner" :selected="selectedItem">
          {{ targetText }}
        </slot>
      </Button>
    </slot>
    <client-only>
      <Teleport to="#teleports">
        <transition name="slide-up">
          <div
            v-if="isOpen"
            ref="dropdownList"
            class="dropdown-list"
            :class="[`bg-${dropDownBg}`, dropUp && 'open-to-top']"
            :style="{
              '--x': positions.x,
              '--y': positions.y,
              '--w': positions.w,
            }"
          >
            <slot
              name="contentPrepend"
              :loading="loading"
              :selected="selectedItem"
              :close-drop-down="closeDropDown"
            />
            <div class="dropdown-list__inner">
              <slot
                name="listPrepend"
                :loading="loading"
                :selected="selectedItem"
                :close-drop-down="closeDropDown"
              />
              <template v-if="!items.length || !items">
                <slot name="emptyContent">
                  <div
                    class="font-16-n text-center"
                    style="padding: 2rem 0;"
                  >
                    No items...
                  </div>
                </slot>
              </template>
              <template v-for="(item, i) in items" :key="i">
                <slot
                  name="item"
                  :item="item"
                  :selected="selectedItem"
                  :is-selected="selectedItem === item"
                  :select-item="() => selectItem(item)"
                  :close-drop-down="closeDropDown"
                >
                  <Button
                    bg-color="surface-high-container"
                    hover-bg-color="surface-highest-container"
                    :text-color="selectedItem === item ? 'secondary' : undefined"
                    :size="size"
                    :padding="size === 's' ? '1rem' : undefined"
                    fluid
                    @click="selectItem(item)"
                  >
                    <slot
                      name="itemInner"
                      :item="item"
                      :selected="selectedItem"
                      :is-selected="selectedItem === item"
                    >
                      {{ itemLabel ? String(item[itemLabel as keyof T]) : String(item) }}
                    </slot>
                  </Button>
                </slot>
              </template>
              <slot
                name="listAppend"
                :loading="loading"
                :selected="selectedItem"
                :close-drop-down="closeDropDown"
              />
            </div>
          </div>
        </transition>
      </Teleport>
    </client-only>
  </div>
</template>

<style scoped lang="scss">
.dropdown-list {
  position: fixed;
  top: var(--y);
  left: var(--x);
  width: var(--w);
  z-index: 10;
  border: 1px solid var(--outline);
  border-radius: var(--radius-sm);
  display: flex;
  flex-direction: column;
  max-height: min(50dvh, 35rem);
  overflow: hidden;
  padding: 0.4rem 0;
  &__inner {
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    overflow-y: auto;
    flex-grow: 1;
    padding: 0 0.4rem;
  }
  &.open-to-top {
    top: auto;
    bottom: var(--y);
  }
}
</style>
