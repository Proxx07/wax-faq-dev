<script setup lang="ts">
import { search } from '@/assets/icons/actions';
import { Input, VIcon } from '@/components/ui';

const props = defineProps<{
  search: string
}>();

const emit = defineEmits<{
  (e: 'update:search', value: string): void
}>();

const { t } = useI18n();

const model = computed({
  get() {
    return props.search;
  },
  set(value: string) {
    emit('update:search', value);
  },
});
</script>

<template>
  <div class="search-block">
    <div class="search-block__inner center-block">
      <div class="title">
        {{ t('search_block.title') }}
      </div>

      <div
        class="description color-on-surface-secondary"
        v-html="t('search_block.description')"
      />

      <div class="field-wrapper">
        <Input
          v-model="model"
          :placeholder="t('search')"
          fluid
        >
          <template #prefix>
            <VIcon :icon="search" style="margin-left: 1.2rem" />
          </template>
        </Input>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.search-block {
  width: 100%;
  padding: 5.6rem 0 6.6rem;
  @include media-min($tablet) {
    background: url('/images/search-block-bg.png') 50% 50% / cover no-repeat;
  }
  @include media-max($tablet) {
    padding: 2.4rem 0 0;
  }
  &__inner {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    align-items: center;
    text-align: center;
    @include media-max($tablet) {
      text-align: left;
      align-items: flex-start;
    }
  }
  .title {
    font: var(--font-48-sb);
    @include media-max($tablet) {
      font: var(--font-24-sb);
    }
  }
  .description {
    font: var(--font-16-n);
    line-height: 1.5;
    @include media-max($tablet) {
      display: none;
    }
  }
}
.field-wrapper {
  max-width: 40rem;
  width: 100%;
  margin-top: 3rem;
  @include media-max($tablet) {
    margin-top: .4rem;
  }
  :deep(.input-inner) {
    --gap: 1.2rem;
  }
}
</style>
