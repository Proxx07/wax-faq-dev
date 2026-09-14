<script setup lang="ts">
import type { I18nModuleType } from '@/composables/useModuleI18n';
import { link, tick } from '@/assets/icons/actions';
import { arrowLeft } from '@/assets/icons/arrows';
import { FeedBackForm, NotFound } from '@/components/content';
import { Button, TagRenderer, VIcon } from '@/components/ui';
import { useModuleI18n } from '@/composables/useModuleI18n';
import { usePage } from '@/composables/usePage';

const $router = useRouter();
const { $toast } = useNuxtApp();

const slug = $router.currentRoute.value.params.slug as I18nModuleType;
const urlForCopy = useRequestURL();

await useModuleI18n(slug);
const { t } = useI18n();
const { copy, copied } = useClipboard();
const { getPageContent } = usePage();

const PageContent = getPageContent(slug);

const copyHandler = async () => {
  if (copied.value) return;
  await copy(urlForCopy.href);
  $toast.success(t('link_copied'));
};

const title = computed(() => {
  if (!PageContent) return t('page_not_found');
  if (!PageContent.length) return 'Coming soon';
  return t(`${slug}.title`);
});

useSeoMeta({
  title: title.value,
  ogTitle: title.value,
  description: title.value,
  ogDescription: title.value,
});
</script>

<template>
  <div class="faq-page">
    <Button
      class="hide-up-tablet mb-1"
      :label="t('more_answers')"
      :icon-left="arrowLeft"
      severity="tertiary"
      size="s"
      variant="text"
      no-hover-bg
      padding="1.2rem 0"
      text-color="on-surface-tertiary"
      button-type="nuxt-link"
      to="/"
      fluid
    />
    <div class="headline">
      <h1 v-if="PageContent">
        {{ title }}
      </h1>

      <span
        v-if="PageContent"
        :class="[copied ? 'color-secondary' : 'color-on-surface']"
        @click="copyHandler"
      >
        <VIcon :icon="copied ? tick : link" />
      </span>
    </div>

    <NotFound v-if="!PageContent" :title="title" />

    <div v-else-if="PageContent.length" class="page-content">
      <TagRenderer
        v-for="(node, index) in PageContent"
        :key="index"
        :node="node"
      />
    </div>

    <FeedBackForm v-if="PageContent?.length" :title="title" />
  </div>
</template>

<style scoped lang="scss">
.headline {
  gap: 1rem;
  h1 {
    display: inline;
    @include media-max($tablet) {
      font: var(--font-20-sb);
    }
  }
  span {
    cursor: pointer;
    display: inline-block;
    font-size: 0;
    vertical-align: sub;
    margin-left: .4rem;
  }
}

.page-content {
  padding-top: 3.2rem;
  color: var(--on-surface-tertiary);
  font: var(--font-16-n);
  line-height: 1.5;

  a {
    color: var(--primary);
  }
  p {
    margin: 0 0 3.2rem;
    @include media-max($tablet) {
      margin-bottom: 2rem;
    }
  }

  h6 {
    color: var(--on-surface);
    font: var(--font-20-sb);
    margin-bottom: 3.2rem;
    @include media-max($tablet) {
      font: var(--font-16-sb);
      margin-bottom: 2rem;
    }
  }

  picture {
    display: inline-block;
    margin-bottom: 3.2rem;
    padding: 2rem;
    background: var(--surface-low-container);
    border-radius: var(--radius-xl);
    @include media-max($tablet) {
      padding: 0.6rem;
      margin-bottom: 2rem;
    }
  }
}
.mb-1 {
  margin-bottom: 1rem;
}
</style>
