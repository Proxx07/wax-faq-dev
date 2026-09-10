import type { TSizes } from '@/utils';

export interface SwitcherProps {
  modelValue?: boolean
  label?: string
  loading?: boolean
  fluid?: boolean
  size?: Extract<TSizes, 's' | 'm'>
  reverseDirection?: boolean
}

export interface SwitcherEmits {
  (e: 'update:modelValue', value: boolean): void
}

export interface SwitcherSlots {
  default: (props: { isHovered: boolean, label: string }) => unknown
}
