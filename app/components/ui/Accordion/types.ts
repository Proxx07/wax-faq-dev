export interface AccordionProps {
  title?: string
  opened?: boolean
}

export interface AccordionEmits {
  (e: 'after-open'): void
  (e: 'after-close'): void
}
export interface AccordionSlots {
  default: () => unknown
  slotForClosed: () => unknown
}
