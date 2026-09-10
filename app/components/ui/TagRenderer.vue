<script setup lang="ts">
import type { PageContentElement } from '@/composables/usePage';
// eslint-disable-next-line import/no-self-import
import TagRenderer from './TagRenderer.vue';

const props = defineProps<{
  node: PageContentElement
}>();

const { t } = useI18n();
const voidElements = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'source', 'track', 'wbr',
]);

const isVoid = computed(() => voidElements.has(props.node.tag as string));
</script>

<template>
  <component
    :is="node.tag"
    v-if="isVoid"
    v-bind="node.props"
  />

  <component
    :is="node.tag"
    v-else
    v-bind="node.props"
  >
    <template v-if="node.text">
      {{ node.localize ? t(node.text) : node.text }}
    </template>
    <template v-if="node.child">
      <TagRenderer
        v-for="(childNode, index) in node.child"
        :key="index"
        :node="childNode"
      />
    </template>
  </component>
</template>
