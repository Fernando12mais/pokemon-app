<script setup lang="ts">
export type PokeTypeProps = {
  type: string;
};

defineProps<PokeTypeProps>();
</script>

<template>
  <span
    :class="`subtititle-3 rounded-2xl p-2 text-grayscale-white bg-pokemon-${$props.type} font-bold capitalize`"
  >
    {{ $props.type }}
  </span>
</template>
