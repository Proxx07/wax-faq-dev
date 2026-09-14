<script setup lang="ts">
import { arrowLeft } from '@/assets/icons/arrows';
import { Button } from '@/components/ui';

defineProps<{
  title: string
}>();
</script>

<template>
  <div class="error">
    <div class="font-48-sb">
      404
    </div>

    <div class="font-24-m">
      {{ title }}
    </div>

    <div class="font-18-n color-on-surface-tertiary">
      Unfortunately, the page you requested has been deleted or moved.
    </div>

    <Button
      :icon-left="arrowLeft"
      severity="secondary"
      variant="ghost"
      button-type="nuxt-link"
      to="/"
      label="Back to main"
      class="ml-auto mr-auto"
    />
  </div>
</template>

<style scoped lang="scss">
.error {
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 2.6rem;
}
</style>
