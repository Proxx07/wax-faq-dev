<script setup lang="ts">
const list = ref(['1', '2', '3']);
</script>

<template>
  <nav>
    <ul>
      <li v-for="page in list" :key="page">
        <div
          class="nav-item"
        >
          {{ page }}
        </div>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 1rem;
    align-items: center;
  }
  .nav-item {
    text-decoration: none;
    color: var(--on-surface-secondary);
    font: var(--font-16-n);
    padding: 1rem;
    display: inline-block;
    @include transition(color);
    &:hover,
    &.router-link-active {
      color: var(--on-surface);
    }
    &.router-link-active {
      pointer-events: none;
    }
  }
}
</style>
