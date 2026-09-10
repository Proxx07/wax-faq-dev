<script setup lang="ts">
import type { Ref } from 'vue';
import { support } from '@/assets/icons/features';
import { LangSwitcher, ThemeSwitcher } from '@/components/globalSelects';
import { Button, Drawer } from '@/components/ui';
import { useResponsive } from '@/composables/UI';
import { FOOTER_NAVIGATION_ITEMS, FOOTER_SOCIAL_LINKS } from '@/composables/useAsideNavigation';
import { useDrawerStore } from '@/store/drawerStore';

const { isMax } = useResponsive();
const { y } = useWindowScroll();
const isFooterVisible = ref(false);
const transform = computed(() => isFooterVisible.value ? 'translateY(0)' : 'translateY(100%)');

const onScroll = useThrottleFn((value: number, oldValue: number) => {
  if (!oldValue || isMax('tablet')) return;
  isFooterVisible.value = value - oldValue < 0;
}, 250);
const stopWatcher = watch(y, onScroll);

const drawerStore = useDrawerStore();
const { t } = useI18n();
onMounted(() => {
  if (isMax('tablet')) return stopWatcher();
  isFooterVisible.value = true;
});

defineExpose<{
  isFooterVisible: Ref<boolean>
}>({ isFooterVisible });
</script>

<template>
  <footer>
    <div class="left-part">
      <Button
        :icon-left="support"
        size="s"
        label="Support"
        severity="tertiary"
        variant="text"
        no-hover-bg
      />

      <nav>
        <ul>
          <li v-for="item in FOOTER_NAVIGATION_ITEMS" :key="item.link">
            <Button
              button-type="a"
              :href="item.link"
              target="_blank"
              rel="nofollow"
              severity="tertiary"
              variant="text"
              text-color="on-surface-secondary"
              hover-text-color="on-surface"
              no-hover-bg
              size="s"
            >
              {{ t(item.name) }}
            </Button>
          </li>

          <li v-for="social in FOOTER_SOCIAL_LINKS" :key="social.link">
            <Button
              button-type="a"
              :href="social.link"
              target="_blank"
              rel="nofollow"
              severity="tertiary"
              variant="text"
              text-color="on-surface-secondary"
              hover-text-color="on-surface"
              no-hover-bg
              size="s"
              :icon-left="social.icon"
            />
          </li>
        </ul>
      </nav>
    </div>
    <div class="right-part">
      <LangSwitcher />
      <ThemeSwitcher />
    </div>

    <client-only>
      <Drawer
        v-model="drawerStore.isOpened"
        position="right"
        offset-top="7rem"
        hide-header
      >
        <nav>
          <ul class="flex-col">
            <li v-for="item in FOOTER_NAVIGATION_ITEMS" :key="item.link">
              <Button
                button-type="a"
                :href="item.link"
                target="_blank"
                rel="nofollow"
                severity="tertiary"
                variant="text"
                text-color="on-surface-secondary"
                hover-text-color="on-surface"
                no-hover-bg
                fluid
                padding="12px 0 11px"
              >
                {{ t(item.name) }}
              </Button>
            </li>
          </ul>
          <br><br>
          <div class="flex-col">
            <LangSwitcher variant="modal" />
            <ThemeSwitcher variant="modal" />
          </div>
        </nav>
        <template #footer>
          <nav>
            <ul class="flex justify-center gap">
              <li v-for="social in FOOTER_SOCIAL_LINKS" :key="social.link">
                <Button
                  button-type="a"
                  :href="social.link"
                  target="_blank"
                  rel="nofollow"
                  severity="tertiary"
                  variant="text"
                  size="s"
                  :icon-left="social.icon"
                />
              </li>
            </ul>
          </nav>
        </template>
      </Drawer>
    </client-only>
  </footer>
</template>

<style scoped lang="scss">
footer {
  position: fixed;
  inset: 0;
  top: auto;
  grid-column: span 2;
  transform: v-bind(transform);
  @include transition(transform, var(--slow-timing));

  display: flex;
  align-items: center;
  background: var(--outline);
}

.left-part {
  display: flex;
  align-items: center;
  ul {
    display: flex;
    align-items: center;
  }
}

nav {
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
}

.right-part {
  margin-left: auto;
  display: flex;
  align-items: center;
}
</style>
