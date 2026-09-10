export interface IAsideNavigationItem {
  groupName: string
  isExpanded?: boolean
  children?: Array<{
    name: string
    link: `/${string}`
  }>
}
