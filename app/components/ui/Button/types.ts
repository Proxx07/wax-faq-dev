import type { MaybeComputedElementRef } from '@vueuse/core';
import type { TColors, TSizes } from '@/utils';

type Severity = 'primary' | 'secondary' | 'tertiary' | 'destructive' | 'attention';

export interface ButtonProps {
  severity?: Severity
  size?: TSizes
  variant?: 'outlined' | 'text' | 'ghost'

  buttonType?: 'button' | 'nuxt-link' | 'a'
  label?: string

  iconLeft?: string // svg icons from assets
  iconRight?: string // svg icons from assets

  bgColor?: TColors
  hoverBgColor?: TColors
  textColor?: TColors
  hoverTextColor?: TColors
  borderColor?: TColors

  padding?: string
  noHoverBg?: boolean
  fluid?: boolean

  rotateLeftIcon?: boolean
  rotateRightIcon?: boolean
  leftIconNoFill?: boolean
  rightIconNoFill?: boolean
  loading?: boolean
}

export interface ButtonSlots {
  append: (props: { isHovered: boolean }) => unknown
  default: (props: { isHovered: boolean }) => unknown
  prepend: (props: { isHovered: boolean }) => unknown
}

export interface ButtonExpose {
  buttonRef: MaybeComputedElementRef
}
