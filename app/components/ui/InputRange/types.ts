import type { TColors } from '@/utils';

export interface InputRangeProps {
  modelValue?: number
  range?: boolean
  from?: number
  to?: number
  min?: number
  max?: number
  step?: number
  fillBg?: TColors | 'float-bg' | 'fade-bg'
  disabled?: boolean
  showValue?: boolean
  hideValue?: boolean
  fluidFill?: boolean

  valuePrefix?: string
  valueSuffix?: string
  valueBg?: TColors
}

export interface InputRangeEmits {
  (e: 'update:modelValue', value: number): void
  (e: 'update:from', value: number): void
  (e: 'update:to', value: number): void
}
