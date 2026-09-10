import type { TColors } from '@/utils';

export interface DrawerProps {
  modelValue: boolean
  title?: string
  position?: 'left' | 'right'
  offsetTop?: string
  drawerBg?: TColors
  hideHeader?: boolean
}

export interface DrawerEmits {
  (e: 'update:modelValue', value: boolean): void
}

export interface DrawerSlots {
  header: (props: { close: () => void }) => unknown
  default: (props: { close: () => void }) => unknown
  footer: () => unknown
}
