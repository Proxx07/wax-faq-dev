<script setup lang="ts">
import { arrowRight } from '@/assets/icons/arrows';
import { emptyCard } from '@/assets/icons/placeholders';
import { Button, VIcon } from '@/components/ui';
import { useModuleI18n } from '@/composables/useModuleI18n';
import { useSearchStore } from '@/store/searchStore';

definePageMeta({
  layout: {
    name: 'default',
    props: {
      hideSideBar: true,
    },
  },
});
await useModuleI18n('all');
const searchStore = useSearchStore();
</script>

<template>
  <div class="search-page">
    <h1 v-if="searchStore.foundCount">
      {{ searchStore.foundCount }} search results
    </h1>

    <div v-if="searchStore.foundCount" class="list">
      <Button
        v-for="page in searchStore.filterBySearch"
        :key="page.link"
        button-type="nuxt-link"
        :to="page.link"
        severity="tertiary"
        padding="2rem"
        bg-color="surface-container"
        hover-bg-color="surface-high-container"
        fluid
        @click="searchStore.searchQuery = ''"
      >
        <div class="button-inner">
          <div class="text">
            <div class="font-16-m" v-html="page.title" />
            <div class="spoiler">
              <div class="description" v-html="page.description" />
            </div>
          </div>
          <VIcon :icon="arrowRight" :size="24" />
        </div>
      </Button>
    </div>

    <div v-else class="empty">
      <VIcon :icon="emptyCard" no-fill />

      <div class="font-18-n">
        No results found
      </div>

      <div class="font-16-n color-on-surface-tertiary">
        Check the spelling, or contact support if you can't find what you need
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
h1 {
  margin-bottom: 2rem;
  font: var(--font-16-m);
  @include media-max($tablet-s) {
    font: var(--font-14-m);
  }
}
.empty {
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  padding-top: 4rem;
  text-align: center;
}
.list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  max-width: 100%;
  min-width: 0;
  @include media-max($tablet-s) {
    grid-template-columns: 1fr;
  }
  :deep(.w-button) {
    min-width: 0;
  }
}

.button-inner {
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 100%;

  .text {
    max-width: calc(100% - 3.6rem);
  }

  .description {
    font: var(--font-14-n);
    line-height: 1.5;
    margin-top: .8rem;
    color: var(--on-surface-tertiary);

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
  }

  :deep(mark) {
    background: rgba(41, 94, 213, .1);
    color: var(--primary);
  }
}
</style>
