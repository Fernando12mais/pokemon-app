<script setup lang="ts">
import type { Pokemon } from "pokedex-promise-v2";
export type StatProps = {
  stat: Pokemon["stats"][0];
  type: string;
};
defineProps<StatProps>();
const attackTypes: Record<string, string> = {
  hp: "hp",
  attack: "atk",
  defense: "df",
  "special-attack": "spatk",
  "special-defense": "spdf",
  speed: "speed",
};
</script>

<template>
  <ul>
    <li>
      <div class="border-1 flex items-center gap-2 border-r-black px-4">
        <h3
          :class="`font-bold uppercase text-action subtitle-3 text-pokemon-${$props.type} w-16 whitespace-nowrap text-start sm:hidden`"
        >
          {{ attackTypes[$props.stat.stat.name] }}
        </h3>
        <h3
          :class="`font-bold uppercase text-action subtitle-3 text-pokemon-${$props.type} hidden w-52 whitespace-nowrap  text-start sm:block md:w-64`"
        >
          {{ $props.stat.stat.name }}
        </h3>

        <AtmProgressBar
          :type="$props.type"
          :percentage="getStatPercentage($props.stat.base_stat)"
        />
      </div>
    </li>
  </ul>
</template>
