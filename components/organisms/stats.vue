<script setup lang="ts">
import type { StatProps } from "components/molecules/stat.vue";

export type StatsProps = {
  stats: StatProps[];
};

defineProps<StatsProps>();
</script>

<template>
  <div>
    <ul class="flex flex-col gap-2">
      <li v-for="{ stat, type } in $props.stats">
        <MolStat :type="type" :stat="stat" />
      </li>
    </ul>
  </div>
</template>
