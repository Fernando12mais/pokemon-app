<script lang="ts" setup>
defineProps<{ loading: Boolean }>();
</script>

<template>
  <div v-if="loading" class="flex min-h-screen items-center justify-center">
    <AtmLoading />
  </div>
</template>
