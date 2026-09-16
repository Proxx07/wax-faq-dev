<script setup lang="ts">
import WLogo from '~~/public/logo/logo.svg?raw';
import { cross } from '@/assets/icons/actions';
import { arrowLeft } from '@/assets/icons/arrows';
import { support } from '@/assets/icons/features';
import { burgerMenu, loader } from '@/assets/icons/general';
import { Button, VIcon } from '@/components/ui';
import { useDrawerStore } from '@/store/drawerStore';

const { t } = useI18n();
const drawerStore = useDrawerStore();
const { $chat } = useNuxtApp();
</script>

<template>
  <header class="header">
    <div class="header__inner center-block">
      <div class="header__logo">
        <NuxtLinkLocale class="logo" to="/">
          <VIcon :icon="WLogo" /> Waxpeer
        </NuxtLinkLocale>
        <span class="help-center"> | </span>
        <span class="help-center">
          {{ t('help_center') }}
        </span>
      </div>

      <div class="header__right">
        <Button
          :icon-left="arrowLeft"
          button-type="a"
          href="https://waxpeer.com"
          rel="nofollow"
          variant="text"
          severity="tertiary"
          text-color="on-surface-secondary"
          hover-text-color="on-surface"
          no-hover-bg
          padding="1.2rem 1.6rem 1.1rem"
          class="back-to-market"
        >
          <span class="hide-down-mobile">
            {{ t('back_to_market') }}
          </span>
          <span class="hide-up-mobile">
            {{ t('back_to_market_short') }}
          </span>
        </Button>

        <Button
          :icon-left="$chat.isInitializing ? loader : support"
          variant="text"
          severity="tertiary"
          :label="t('contact_support')"
          hover-text-color="on-surface"
          no-hover-bg
          padding="1.2rem 1.6rem 1.1rem"
          class="hide-down-tablet"
          @click="$chat.open"
        />

        <Button
          class="hide-up-tablet"
          :icon-left="drawerStore.isOpened ? cross : burgerMenu"
          :severity="drawerStore.isOpened ? 'destructive' : 'tertiary'"
          variant="text"
          @click="drawerStore.toggleDrawer"
        />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: #{mix-color-transparent(var(--surface-container), .9)};
  backdrop-filter: blur(5px);

  &__inner {
    display: grid;
    align-items: center;
    grid-template-columns: 330px 1fr;
    padding: 1.3rem 0 1.2rem;
    @include media-max($tablet) {
      display: flex;
      align-items: center;
    }
  }

  &__logo {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-left: 1rem;
    @include media-max($mobile) {
      gap: .5rem;
      padding-bottom: 1px;
    }
    .help-center {
      font: var(--font-16-n);
      color: var(--on-surface-secondary);
      @include media-max($mobile) {
        font: var(--font-14-n);
      }
    }
  }

  &__right {
    display: flex;
    align-items: center;
    margin-left: auto;
  }
}
.back-to-market {
  @include media-max($mobile) {
    --font: var(--font-14-n) !important;
    padding: 1rem 0 !important;
    :deep(.icon) {
      display: none;
    }
  }
}
.burger-button {
  @include media-min($tablet) {
    display: none !important;
  }
}

.logo {
  font-size: 0;
  @include media-max($mobile) {
    width: 4.1rem;
    overflow: hidden;
    :deep(svg) {
      max-width: unset;
    }
    :deep(.logo-letter) {
      display: none;
    }
  }
}
</style>
