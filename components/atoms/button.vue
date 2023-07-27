<script setup lang="ts">
const emits = defineEmits<{ onClick: [] }>();
</script>

<template>
  <button @click="() => emits('onClick')" :class="[$style.base]">
    <slot></slot>
  </button>
</template>

<style module>
.base {
  @apply rounded-lg bg-action px-6 py-3 text-grayscale-white shadow-2-dp lg:text-lg;
}
</style>
