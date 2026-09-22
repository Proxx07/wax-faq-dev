<script setup lang="ts">
import type { AvatarProps } from './types';
import { NuxtLinkLocale } from '#components';
import { tick } from '@/assets/icons/actions';
import { directToOtherPage } from '@/assets/icons/arrows';
import { verified as verIcon } from '@/assets/icons/features';
import VIcon from '../VIcon.vue';

const {
  size = 'm',
  image = '',
  name = '',
  link = '',
  hideName = false,
  verified = false,
  hideImage = false,
} = defineProps<AvatarProps>();

const avatar = computed(() => {
  if (image) return image;
  return name[0] || '';
});

const tag = link ? NuxtLinkLocale : 'button';
const font = size === 'xl' ? 'font-24-n' : 'font-16-n';
const isAbsoluteLink = link?.startsWith('http');

const VerifiedIcon = h('div',
  { class: 'relative flex' },
  [
    h(VIcon, {
      icon: verIcon,
      noFill: true,
      size: (size === 'xl' || size === 'l') ? 22 : 17,
    }),
    h(VIcon, {
      icon: tick,
      color: 'surface',
      size: (size === 'xl' || size === 'l') ? 15 : 9,
      style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    }),
  ],
);
</script>

<template>
  <component
    :is="tag"
    :to="link && link"
    :class="[`avatar--${size}`]"
    :target="isAbsoluteLink && '_blank'"
    :rel="isAbsoluteLink && 'nofollow'"
    class="avatar"
  >
    <div v-if="!hideImage" class="avatar__image" :class="[(verified && size !== 's') && 'avatar__image--verified']">
      <div class="avatar__image-content">
        <div v-if="avatar.length === 1" class="letter">
          {{ avatar }}
        </div>
        <img v-else :src="avatar" :alt="name" loading="eager">
      </div>
      <div v-if="verified && (size === 'm' || size === 'l')" class="verified-icon">
        <VerifiedIcon />
      </div>
    </div>
    <div v-if="!hideName" class="avatar__name" :class="font">
      {{ name }}
      <VerifiedIcon v-if="verified && ((size === 's' || size === 'xl') || hideImage)" />
      <VIcon v-if="link" :icon="directToOtherPage" :size="size !== 'xl' ? 20 : 24" />
    </div>
  </component>
</template>

<style scoped lang="scss">
.avatar {
  --size: 4rem;
  --gap: 0.8rem;
  --shadow-scale: 1;

  font-size: 0;
  display: flex;
  align-items: center;
  gap: var(--gap);
  color: var(--on-surface);

  &:hover {
    --shadow-scale: 1.4;
  }

  &--s {
    --size: 2rem;
  }
  &--m {
    --size: 4rem;
    &:hover {
      --shadow-scale: 1.6;
    }
  }
  &--l {
    --size: 6.4rem;
    --gap: 1.2rem;
  }
  &--xl {
    --size: 10rem;
    --gap: 2.4rem;
  }

  &__image {
    width: var(--size);
    height: var(--size);
    min-width: var(--size);
    border-radius: 50%;
    font-size: 0;
    position: relative;

    &:before,
    &:after {
      content: '';
      position: absolute;
      inset: 0;
      pointer-events: none;
      border-radius: 50%;
      background: var(--surface-highest-container);
      opacity: 0.6;
      transform: scale(var(--shadow-scale));
      z-index: -1;
      @include transition(transform);
    }

    &:after {
      inset: 5%;
      opacity: 0.3;
    }

    &-content {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background: var(--outline);
      border-radius: 50%;
      position: relative;
    }

    &--verified {
      border: 2px solid var(--primary);
      padding: 2px;
    }
  }

  &__name {
    display: flex;
    align-items: center;
    gap: .3rem;
  }

  .verified-icon {
    position: absolute;
    right: 0;
    bottom: 0;
    transform: translate(20%, 25%);
  }

  .letter {
    font-size: calc(var(--size) / 1.5);
    line-height: 1;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
}
</style>
