<script setup lang="ts">
import type { IUser } from '@/composables/useUser';
import { logOut } from '@/assets/icons/general';
import { Avatar, Button, Popover } from '@/components/ui';

defineProps<{
  user: IUser
}>();

const emit = defineEmits<{
  (e: 'logout'): void
}>();

const target = ref<HTMLElement>();
const [opened, toggle] = useToggle();
</script>

<template>
  <div class="avatar-wrapper">
    <div ref="target" @click="toggle()">
      <Avatar
        :name="user.name"
        :image="user.avatar"
        :verified="user.email_verified"
        hide-name
      />
    </div>
    <client-only>
      <Popover
        v-model="opened"
        :target="target"
        stay-on-scroll
        hidden
        min-height="unset"
      >
        <div class="flex items-center">
          <Button
            :icon-right="logOut"
            variant="text"
            fluid
            severity="destructive"
            padding="1.2rem .5rem 1.1rem"
            @click="emit('logout')"
          >
            <div class="color-on-surface">
              {{ user.name }}
            </div>
          </Button>
        </div>
      </Popover>
    </client-only>
  </div>
</template>

<style scoped>
.avatar-wrapper {
  padding-right: 2rem;
}
</style>
