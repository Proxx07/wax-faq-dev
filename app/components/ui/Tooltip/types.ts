import type { TColors, TSizes } from '@/utils';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  text?: string
  position?: TooltipPosition
  background?: TColors
  color?: TColors
  maxWidth?: number // pixels
  size?: Extract<TSizes, 'm' | 's'>
}

export interface TooltipSlots {
  default: () => unknown
  content: () => unknown
}
