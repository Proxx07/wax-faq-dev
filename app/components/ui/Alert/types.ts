export type AlertType = 'error' | 'attention' | 'success';

export interface AlertProps {
  type?: AlertType
  isToast?: boolean
  title?: string
  description?: string
  noIcon?: boolean
  icon?: string // SVG icon from assets
  fluid?: boolean
  closeTimeout?: number // in seconds
}
