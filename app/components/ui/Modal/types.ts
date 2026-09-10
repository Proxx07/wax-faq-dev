import type { TColors } from '@/utils';

export interface ModalProps {
  modelValue: boolean
  modalBg?: TColors
  maxWidth?: number
  contentMinHeight?: number
  noHeaderBorder?: boolean
  title?: string
  backButton?: boolean
}

export interface ModalEmits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'back'): void
}

export interface ModalSlots {
  'header': () => unknown
  'header-above': () => unknown
  'header-inner': () => unknown
  'header-prepend': (props: { emitBack: () => void }) => unknown
  'header-append': () => unknown
  'content': () => unknown
  'footer': () => unknown
  'footer-inner': () => unknown
}
