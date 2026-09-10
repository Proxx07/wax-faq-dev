<script setup lang="ts">
import { Alert } from '@/components/ui';

const { $toast } = useNuxtApp();
const { t } = useI18n();

useHead({
  link: [
    { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/commissioner-latin.woff2', crossorigin: '' },
    { rel: 'preload', as: 'font', type: 'font/woff2', href: '/fonts/commissioner-cyrillic.woff2', crossorigin: '' },
  ],
});
</script>

<template>
  <div id="app-wrapper">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <client-only>
      <div class="toasts-container">
        <transition-group name="scale-fade">
          <Alert
            v-for="toast in $toast.list.value"
            :key="toast.id"
            :type="toast.type"
            :close-timeout="toast.closeTimeout"
            :title="toast.title?.includes('toast') ? t(toast.title) : toast.title"
            :description="toast.description"
            fluid
            is-toast
            no-icon
            @update:model-value="() => $toast.removeToast(toast.id)"
          />
        </transition-group>
      </div>
    </client-only>
  </div>
</template>

<style lang="scss">
#app-wrapper {
  min-height: 100dvh;
  display: flex;
  background: var(--surface);
}

.toasts-container {
  position: fixed;
  max-width: 30rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  right: 0;
  bottom: 0;
  z-index: 1000;
  pointer-events: none;
  gap: .6rem;
  padding: .6rem;
  > * {
    pointer-events: all;
  }
}

.hide-down-mobile {
  @include media-max($mobile) {
    display: none !important;
  }
}

.hide-down-tablet {
  @include media-max($tablet) {
    display: none !important;
  }
}

.hide-down-laptop {
  @include media-max($laptop) {
    display: none !important;
  }
}
.hide-down-laptop-s {
  @include media-max($laptop-s) {
    display: none !important;
  }
}

.hide-up-mobile {
  @include media-min($mobile) {
    display: none !important;
  }
}

.hide-up-tablet {
  @include media-min($tablet) {
    display: none !important;
  }
}

.hide-up-laptop {
  @include media-min($laptop) {
    display: none !important;
  }
}

.hide-up-laptop-s {
  @include media-min($laptop-s) {
    display: none !important;
  }
}
</style>
