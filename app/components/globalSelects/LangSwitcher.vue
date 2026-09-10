<script setup lang="ts">
import type { LocaleItemType } from '~~/i18n/types';
import { chevronRight } from '@/assets/icons/arrows';
import { russia, unitedStates } from '@/assets/icons/flags';
import { Button, DropDown, Modal, RadioButton, VIcon } from '@/components/ui';

const {
  variant = 'dropdown',
} = defineProps<{
  variant?: 'dropdown' | 'modal'
}>();

const switchLocalePath = useSwitchLocalePath();
const { t, locales, locale, setLocale } = useI18n();

const flagsMap: Record<LocaleItemType['code'], string> = {
  ru: russia,
  en: unitedStates,
};
const setLocaleHandler = async (value: LocaleItemType['code']) => {
  await setLocale(value);
};

const localesList = computed(() => {
  return locales.value.map(locale => ({ ...locale, icon: flagsMap[locale.code] }));
});

const isModalOpened = ref(false);
</script>

<template>
  <div>
    <DropDown
      v-if="variant === 'dropdown'"
      :model-value="locale"
      :items="localesList"
      value="code"
      size="s"
      @update:model-value="setLocaleHandler"
    >
      <template #target="{ toggleDropDown, isOpened, selected, downIcon }">
        <Button
          severity="tertiary"
          variant="text"
          no-hover-bg
          padding="1rem"
          :icon-right="downIcon"
          :icon-left="selected?.icon"
          :rotate-right-icon="isOpened"
          left-icon-no-fill
          label="dropdownValue"
          @click="toggleDropDown"
        >
          {{ selected?.code.toLocaleUpperCase() ?? 'Language' }}
        </Button>
      </template>
      <template #itemInner="{ item }">
        <VIcon :icon="item.icon" no-fill :size="16" style="margin-right: .4rem" />
        <span class="font-16-n">
          {{ item.code.toUpperCase() }}
        </span>
      </template>
    </DropDown>

    <Button
      v-if="variant === 'modal'"
      fluid
      severity="tertiary"
      variant="text"
      padding="1rem 0"
      no-hover-bg
      @click="isModalOpened = true"
    >
      <div class="flex w-full">
        <span class="color-on-surface-tertiary">
          {{ t('language') }}
        </span>
        <div class="flex items-center ml-auto">
          <VIcon :icon="flagsMap[locale]" no-fill :size="24" style="margin-right: .8rem" />
          <span class="font-16-n uppercase">
            {{ locale }}
          </span>
          <VIcon :icon="chevronRight" />
        </div>
      </div>
    </Button>

    <Modal v-if="variant === 'modal'" v-model="isModalOpened" :title="t('change_lang')">
      <template #content>
        <div class="flex-col gap pt-2">
          <RadioButton
            v-for="ln in localesList"
            :key="ln.code"
            :model-value="locale"
            :value="ln.code"
            fluid
            @click="() => {
              setLocaleHandler(ln.code);
              isModalOpened = false;
            }"
          >
            <VIcon :icon="ln.icon" no-fill />
            {{ ln.name }}
          </RadioButton>
        </div>
      </template>
    </Modal>

    <nav hidden>
      <ul>
        <li v-for="ln in localesList" :key="ln.code">
          <a :href="switchLocalePath(ln.code)"> {{ ln.name }} </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
.pt-2 {
  padding-top: 2rem;
}
</style>
