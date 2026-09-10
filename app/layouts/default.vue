<script setup lang="ts">
import { WAside, WFooter, WHeader, WSearchBlock } from '@/components/layout';
import { useSearchStore } from '@/store/searchStore';

const props = defineProps<{
  hideSideBar?: boolean
}>();

const searchStore = useSearchStore();
const $router = useRouter();
const localePath = useLocalePath();
const getRouteBaseName = useRouteBaseName();

const goToSearchPage = useDebounceFn(() => {
  if (getRouteBaseName($router.currentRoute.value) === 'search') {
    if (searchStore.searchQuery) return;
    $router.push({ path: localePath('/') });
  }
  else {
    if (!searchStore.searchQuery) return;
    $router.push({ path: localePath('/search') });
  }
}, 300);
</script>

<template>
  <div class="wrapper" :class="[getRouteBaseName($router.currentRoute.value) !== 'index' && 'inner-page-wrapper']">
    <WHeader />

    <WSearchBlock
      v-model:search="searchStore.searchQuery"
      :class="[getRouteBaseName($router.currentRoute.value) !== 'index' && getRouteBaseName($router.currentRoute.value) !== 'search' && 'hide-down-tablet']"
      @update:search="goToSearchPage"
    />

    <div class="content-wrapper">
      <div class="content-inner center-block">
        <transition name="aside-animation">
          <WAside
            v-if="!props.hideSideBar"
            :class="[getRouteBaseName($router.currentRoute.value) !== 'index' && 'hide-down-tablet']"
          />
        </transition>

        <main class="content" :class="[props.hideSideBar && 'colspan-2']">
          <slot />
        </main>
      </div>
    </div>

    <WFooter />
  </div>
</template>

<style scoped lang="scss">
.wrapper {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  position: relative;
  &:not(.inner-page-wrapper) {
    @include media-max($tablet) {
      background: var(--surface-high-container);
      .content {
        display: none;
      }
    }
  }
}
.content-wrapper {
  overflow-x: hidden;
  overflow-y: visible;
}
.content-inner {
  display: grid;
  grid-template-columns: 28rem auto;
  gap: 11rem;
  padding-top: 3.2rem;
  padding-bottom: 6rem;
  @include media-max($tablet) {
    padding-top: 2rem;
    padding-bottom: 4rem;
    grid-template-columns: 1fr;
  }
}

.content {
  display: flex;
  flex-grow: 1;
  > * {
    width: 100%;
  }
  @include media-max($mobile) {
    padding-left: 0;
    padding-right: 0;
  }
}

.aside-animation-enter-active {
  @include transition(transform);
}

.aside-animation-enter-from,
.aside-animation-leave-to {
  opacity: 0;
  transform: translateX(-100%);
}
</style>
