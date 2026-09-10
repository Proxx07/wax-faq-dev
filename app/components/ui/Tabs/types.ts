import type { TSizes } from '@/utils';

export type TabValue<T, V extends keyof T> = [V] extends [never] ? T : T[V];

export interface TabProps<T, V extends keyof T = never> {
  modelValue?: TabValue<T, V>
  items?: T[]
  value?: V
  itemLabel?: keyof T
  size?: Extract<TSizes, 'l' | 'm' | 's'>
  loading?: boolean
  fluid?: boolean
  noBorder?: boolean
}

export interface TabSlots<T> {
  item: (props: { item: T, isSelected: boolean }) => unknown
  itemInner: (props: { item: T, isSelected: boolean }) => unknown
}

export interface TabEmits<T, V extends keyof T = never> {
  (e: 'update:modelValue', val: TabValue<T, V>): void
}
