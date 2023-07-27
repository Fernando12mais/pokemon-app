<script setup lang="ts">
const emits = defineEmits<{ onClick: [] }>();
</script>

<template>
  <button
    @click="() => emits('onClick')"
    class="rounded-lg bg-action px-6 py-3 text-grayscale-white shadow-2-dp transition-all duration-200 hover:scale-105 hover:shadow-6-dp lg:text-lg"
  >
    <slot></slot>
  </button>
</template>
