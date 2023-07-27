<script setup lang="ts">
const emits = defineEmits<{ onInput: [value: string] }>();
</script>

<template>
  <input
    :class="$style.input"
    v-bind="$attrs"
    @input="
      (e) => {
        const input = e.target as HTMLInputElement;
        emits('onInput', input.value);
      }
    "
  />
</template>

<style module>
.input {
  @apply w-full rounded border-none bg-action p-3  text-grayscale-white focus:outline focus:outline-2;
}

.input::placeholder {
  @apply text-grayscale-white;
}
</style>
