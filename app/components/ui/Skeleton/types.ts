type CSSWidthUnit = 'px' | '%' | 'rem' | 'em' | 'vw' | 'vh';
type SkeletonSizeUnit = Extract<CSSWidthUnit, 'px' | 'rem'>;

export interface SkeletonProps {
  width?: `${number}${CSSWidthUnit}` | 'fit-content'
  height?: `${number}${CSSWidthUnit}` | 'fit-content'
  size?: `${number}${SkeletonSizeUnit}`
  round?: boolean
  skin?: number
}
