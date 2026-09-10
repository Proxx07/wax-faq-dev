import type { TColors, TSizes } from '@/utils';

export type DropDownValue<T, V extends keyof T> = [V] extends [never] ? T : T[V];

export interface DropDownProps<T, V extends keyof T = never> {
  modelValue?: DropDownValue<T, V>
  items?: T[]
  value?: V
  itemLabel?: keyof T
  label?: string
  size?: TSizes
  downIcon?: string
  hideDownIcon?: boolean
  toggleOnHover?: boolean
  loading?: boolean
  dropDownBg?: TColors
  noToggleEmptyList?: boolean
  disabled?: boolean
}

export interface DropDownSlots<T> {
  target: (props: {
    openDropDown: () => void
    closeDropDown: () => void
    toggleDropDown: () => void
    isOpened: boolean
    selected: T | undefined
    downIcon?: string
    loading: boolean
  }) => unknown
  targetInner: (props: { selected: T | undefined }) => unknown
  contentPrepend: (props: { selected: T | undefined, loading: boolean, closeDropDown: () => void }) => unknown
  listPrepend: (props: { selected: T | undefined, loading: boolean, closeDropDown: () => void }) => unknown
  listAppend: (props: { selected: T | undefined, loading: boolean, closeDropDown: () => void }) => unknown
  item: (props: { item: T, selected: T | undefined, isSelected: boolean, selectItem: () => void, closeDropDown: () => void }) => unknown
  itemInner: (props: { item: T, selected: T | undefined, isSelected: boolean }) => unknown
  emptyContent: () => unknown
}

export interface DropDownEmits<T, V extends keyof T = never> {
  (e: 'update:modelValue', val: DropDownValue<T, V>): void
}

export interface DropDownExposes {
  openDropDown: () => void
  closeDropDown: () => void
}
