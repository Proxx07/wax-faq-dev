<script setup lang="ts">
import { chevronRight } from '@/assets/icons/arrows';
import { w } from '@/assets/icons/logos';
import { Button, DropDown, Modal, RadioButton, VIcon } from '@/components/ui';
import { type ThemeModes, useTheme } from '@/composables/UI';
import { capitalizeFirstLetter } from '@/utils';

const { variant = 'dropdown' } = defineProps<{
  variant?: 'dropdown' | 'modal'
}>();

const SQUARE_COLOR: Record<ThemeModes, string> = {
  dark: 'rgb(38, 38, 38)',
  blue: 'rgb(35, 39, 47)',
  light: 'rgb(213, 219, 226)',
};

const LINE_COLOR: Record<ThemeModes, string> = {
  dark: 'rgb(51, 51, 51)',
  blue: 'rgb(46, 51, 62)',
  light: 'rgb(189, 195, 204)',
};
const LOGO_COLOR: Record<ThemeModes, string> = {
  dark: 'rgb(51, 51, 51)',
  blue: 'rgb(46, 51, 62)',
  light: 'rgb(199, 206, 215)',
};

const { themeList, currentTheme, setTheme } = useTheme();
const { t } = useI18n();
const isModalOpened = ref(false);
</script>

<template>
  <div>
    <DropDown
      v-if="variant === 'dropdown'"
      v-model="currentTheme"
      :items="themeList"
      size="s"
      style="min-width: 120px"
      class="theme-switcher"
      @update:model-value="setTheme"
    >
      <template #target="{ toggleDropDown, isOpened, selected, downIcon }">
        <Button
          severity="tertiary"
          variant="text"
          no-hover-bg
          padding="1rem"
          :icon-right="downIcon"
          :rotate-right-icon="isOpened"
          label="dropdownValue"
          @click="toggleDropDown"
        >
          {{ selected ? `${capitalizeFirstLetter(selected)} mode` : 'Select theme' }}
        </Button>
      </template>
      <template #itemInner="{ item }">
        {{ capitalizeFirstLetter(item) }} mode
      </template>
    </DropDown>
    <template v-if="variant === 'modal'">
      <Button
        fluid
        severity="tertiary"
        variant="text"
        padding="1rem 0"
        no-hover-bg
        @click="isModalOpened = true"
      >
        <div class="flex w-full">
          <span class="color-on-surface-tertiary">
            {{ t('mode') }}
          </span>
          <div class="flex items-center ml-auto">
            <span class="font-16-n capitalize-first-letter">
              {{ currentTheme }}
            </span>
            <VIcon :icon="chevronRight" />
          </div>
        </div>
      </Button>

      <Modal v-if="variant === 'modal'" v-model="isModalOpened" :title="t('change_theme')">
        <template #content>
          <div class="flex pt-2 gap">
            <RadioButton
              v-for="theme in themeList"
              :key="theme"
              :model-value="currentTheme"
              :value="theme"
              :label="capitalizeFirstLetter(theme)"
              fluid
              class="radio-button-wrapper"
              @click="() => {
                setTheme(theme);
                isModalOpened = false;
              }"
            >
              <template #append-top>
                <div class="theme-square" :style="{ background: SQUARE_COLOR[theme] }">
                  <div class="icon-wrapper mb-auto" :style="{ background: LOGO_COLOR[theme], color: theme === 'light' ? 'black' : 'white' }">
                    <VIcon :icon="w" :size="24" />
                  </div>

                  <span class="line" :style="{ background: LINE_COLOR[theme] }" />
                  <span class="line" :style="{ background: LINE_COLOR[theme] }" />
                </div>
              </template>
            </RadioButton>
          </div>
        </template>
      </Modal>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.pt-2 {
  padding-top: 2rem;
}
.radio-button-wrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.icon-wrapper {
  padding: .8rem;
  border-radius: var(--radius-l);
  font-size: 0;
}
.theme-square {
  width: 100%;
  aspect-ratio: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.6rem;
  border-radius: var(--radius-l);
  gap: .6rem;
}
.line {
  width: 80%;
  height: .6rem;
  border-radius: 50px;
  & + .line {
    width: 60%;
  }
}
</style>
