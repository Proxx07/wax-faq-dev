<script setup lang="ts">
import { Accordion, Button } from '@/components/ui';
import { useAsideNavigation } from '@/composables/useAsideNavigation';

const $router = useRouter();

const { list } = useAsideNavigation();
const slug = computed(() => $router.currentRoute.value.params?.slug || '');
</script>

<template>
  <aside>
    <Accordion
      v-for="element in list"
      :key="element.groupName"
      :opened="element.isExpanded"
      :title="element.groupName"
    >
      <div class="flex-col">
        <Button
          v-for="item in element.children" :key="item.link"
          button-type="nuxt-link"
          severity="tertiary"
          variant="text"
          :text-color="`/${slug}` === item.link ? 'on-surface' : 'on-surface-secondary'"
          hover-text-color="on-surface"
          padding="12px"
          :label="item.name"
          :to="item.link"
        />
      </div>
    </Accordion>
  </aside>
</template>

<style scoped lang="scss">
aside {
  transition: var(--transition-slow);
  @include media-max($tablet) {
    grid-column: span 2;
  }
}
</style>
