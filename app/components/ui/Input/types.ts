import type { TSizes } from '@/utils';

export type InputModelValue = string | number;

export interface InputProps<T extends InputModelValue = string> {
  modelValue?: T
  size?: TSizes
  invalid?: boolean
  maxWidth?: string
  label?: string
  hint?: string | boolean
  loading?: boolean
  clearable?: boolean
  type?: 'text' | 'number'
  min?: number
  max?: number
  fluid?: boolean
}

export interface InputSlots {
  prefix: () => unknown
  suffix: (props: { loading: boolean }) => unknown
}

export interface InputEmits<T extends InputModelValue = string> {
  (e: 'update:modelValue', val: T): void
  (e: 'after-clear'): void
  (e: 'focus'): void
  (e: 'blur'): void
}
