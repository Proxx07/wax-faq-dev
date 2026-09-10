import type { JSX } from 'vue/jsx-runtime';

type VoidTags = 'area' | 'base' | 'br' | 'col' | 'embed' | 'hr' | 'img' | 'input' | 'link' | 'meta' | 'source' | 'track' | 'wbr';

type NormalTags = Exclude<keyof JSX.IntrinsicElements, VoidTags>;

type VoidElementNode = {
  [Tag in VoidTags]: {
    tag: Tag
    props?: JSX.IntrinsicElements[Tag]
    text?: never
    child?: never
    localize?: boolean
  }
}[VoidTags];

type NormalElementNode = {
  [Tag in NormalTags]: {
    tag: Tag
    props?: JSX.IntrinsicElements[Tag]
    text?: string
    child?: PageContentElement[]
    localize?: boolean
  }
}[NormalTags];

export type PageContentElement = VoidElementNode | NormalElementNode;
