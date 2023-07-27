<template>
  <NuxtLink :class="[$style.base]">
    <slot></slot>
  </NuxtLink>
</template>

<style module>
.base {
  @apply rounded-lg bg-action px-6 py-3 text-grayscale-white shadow-2-dp;
}
</style>
