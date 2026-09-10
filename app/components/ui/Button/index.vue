<script setup lang="ts">
import type { ButtonExpose, ButtonProps, ButtonSlots } from './types';
import { NuxtLinkLocale } from '#components';
import { loader } from '@/assets/icons/general';
import VIcon from '../VIcon.vue';

const {
  severity = 'primary',
  size = 'm',
  buttonType = 'button',
  label = '',
  padding = '',
  textColor = '',
  hoverTextColor = '',
  bgColor = '',
  hoverBgColor = '',
  borderColor = '',
} = defineProps<ButtonProps>();

defineSlots<ButtonSlots>();

const slots = useSlots();

const buttonRef = ref<HTMLElement>();

defineExpose<ButtonExpose>({
  buttonRef,
});

const isHovered = useElementHover(buttonRef);

const tag = computed(() => buttonType === 'nuxt-link' ? NuxtLinkLocale : buttonType === 'a' ? 'a' : buttonType);
const isOnlyIcon = computed(() => !label && !slots.default);

const colorStyles = computed(() => {
  if (textColor || hoverTextColor || bgColor || hoverBgColor) {
    return {
      ...(bgColor && { '--bg': `var(--${bgColor})` }),
      ...(hoverBgColor && { '--hover-bg': `var(--${hoverBgColor})` }),
      ...(textColor && { '--color': `var(--${textColor})` }),
      ...(hoverTextColor && { '--hover-color': `var(--${hoverTextColor})` }),
    };
  }
  return undefined;
});

const bdColor = computed(() => borderColor ? `var(--${borderColor})` : 'transparent');

const pd = computed(() => {
  if (padding) return padding;
  if (size === 's') return '1rem 1.6rem .9rem';
  if (size === 'l') return '1.5rem 2.4rem 1.4rem';
  if (size === 'xl') return '1.8rem 2.4rem 1.7rem';
  return '1.2rem 2.4rem 1.1rem';
});

const iconSize = computed(() => {
  if (!isOnlyIcon.value) return 20;
  if (size === 's') return 20;
  return 24;
});
</script>

<template>
  <component
    :is="tag"
    ref="buttonRef"
    class="w-button"
    :class="[
      severity, variant, `size-${size}`,
      fluid && 'fluid',
      noHoverBg && 'no-hover-bg',
      isOnlyIcon && 'icon-only',
      loading && 'loading',
    ]"
    :style="colorStyles"
  >
    <slot name="prepend" :is-hovered="isHovered">
      <VIcon
        v-if="iconLeft"
        :icon="(isOnlyIcon && loading) ? loader : iconLeft"
        :size="iconSize"
        :no-fill="leftIconNoFill"
        class="icon"
        :class="[(!loading && rotateLeftIcon) && 'rotate']"
      />
    </slot>
    <slot :is-hovered="isHovered">
      {{ label }}
    </slot>
    <slot name="append" :is-hovered="isHovered">
      <VIcon
        v-if="iconRight || (!isOnlyIcon && loading)"
        :icon="(!loading && iconRight) ? iconRight : loader"
        :size="iconSize"
        :no-fill="rightIconNoFill"
        class="icon ml-auto"
        :class="[(!loading && rotateRightIcon) && 'rotate']"
      />
    </slot>
  </component>
</template>

<style scoped lang="scss">
.w-button {
  --radius: var(--radius-sm);
  --gap: .6rem;
  --padding: v-bind(pd);
  --font: var(--font-16-n);
  --border-color: v-bind(bdColor);

  &.primary     { --severity-color: var(--primary) };
  &.secondary   { --severity-color: var(--secondary) };
  &.tertiary    { --severity-color: var(--on-surface) };
  &.destructive { --severity-color: var(--error) };
  &.attention   { --severity-color: var(--attention) };

  &.primary {
    --bg: var(--severity-color);
    --hover-bg: var(--primary-variant);
    --color: var(--on-surface);
    --hover-color: currentColor;
  }

  &.destructive,
  &.attention,
  &.secondary {
    --bg: var(--severity-color);
    --hover-bg: #{mix-color-contrast(var(--bg))};
    --color: var(--on-surface);
    --hover-color: currentColor;
  }

  &.tertiary {
    --bg: var(--outline);
    --hover-bg: var(--outline-variant);
    --color: var(--on-surface);
    --hover-color: currentColor;
    &.outlined {
      --hover-bg: var(--outline);
    }
  }

  &.outlined {
    --border-color: #{mix-color-transparent(var(--severity-color))};
  }

  &.text, &.outlined {
    --bg: transparent;
    --hover-bg: #{mix-color-transparent()};
    --color: var(--severity-color);
    --hover-color: var(--severity-color);
  }

  &.ghost {
    --bg: #{mix-color-transparent()};
    --hover-bg: #{mix-color-contrast(var(--bg))};;
    --color: var(--severity-color);
    --hover-color: var(--severity-color);
  }

  gap: var(--gap);
  padding: var(--padding);
  font: var(--font);
  border-radius: var(--radius);

  display: inline-flex;
  cursor: pointer;
  align-items: center;
  border-width: 1px;
  border-style: solid;
  box-shadow: none;
  line-height: 20px !important;
  text-decoration: none;
  @include transition(opacity background color);

  background: var(--bg);
  color: var(--color);
  border-color: var(--border-color);

  &:not([disabled], .loading) {
    &:hover,
    &.active {
      color: var(--hover-color);
    }
  }

  &:not(.no-hover-bg) {
    &:hover,
    &.active {
      background: var(--hover-bg);
    }
  }

  &.size-s {
    --gap: .4rem;
    --font: var(--font-14-n);
  }

  &.size-l {
    --gap: .8rem;
    --font: var(--font-18-n);
  }

  &.size-xl {
    --font: var(--font-18-n);
  }

  &.icon-only {
    &.size-s, &.size-m {
      --padding: .95rem;
    }

    &.size-l {
      --padding: 1.25rem;
    }
    &.size-xl {
      --padding: 1.55rem;
    }
  }

  &.fluid {
    width: 100%;
  }

  &[disabled] {
    opacity: .7;
    cursor: not-allowed;
  }

  &.loading {
    cursor: wait;
  }

  .icon {
    transition: var(--transition-fast);
    &.rotate {
      transform: rotateZ(180deg);
    }
  }
}
</style>
