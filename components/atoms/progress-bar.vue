<script setup lang="ts">
export type ProgressBarProps = {
  percentage: number;
  type: string;
};
const props = defineProps<ProgressBarProps>();
</script>

<template>
  <div class="flex w-full items-center gap-2">
    <span class="body-1">{{ percentage.toString() }}%</span>

    <div :class="`h-4 w-full rounded-full bg-pokemon-${$props.type}/40`">
      <span
        :style="{ width: `${props.percentage}%` }"
        :class="`block h-full rounded-full bg-action bg-pokemon-${props.type}`"
      >
      </span>
    </div>
  </div>
</template>
