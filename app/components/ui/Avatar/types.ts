import type { TSizes } from '@/utils';

export interface AvatarProps {
  name: string
  size?: TSizes
  image?: string
  link?: string
  verified?: boolean
  anonymous?: boolean
  hideName?: boolean
  hideImage?: boolean
}
