import type { TSizes } from '@/utils';

export type RadioValue = string | number | null;

export interface RadioButtonProps<T extends RadioValue = RadioValue> {
  modelValue?: T
  value?: T
  label?: string
  loading?: boolean
  fluid?: boolean
  size?: Extract<TSizes, 's' | 'm'>
}

export interface RadioButtonEmits<T extends RadioValue = RadioValue> {
  (e: 'update:modelValue', value: T): void
}

export interface RadioButtonSlots {
  'append-top': () => unknown
  'default': (props: { isHovered: boolean, label: string }) => unknown
}
