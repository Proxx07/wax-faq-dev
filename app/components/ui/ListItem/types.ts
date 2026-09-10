export interface ListItemProps {
  label?: string
  leftSlotSize?: number
  rightSlotSize?: number
  gap?: number
  textSpoiler?: boolean
}

export interface ListItemSlots {
  prepend: unknown
  default: unknown
  append: unknown
}
