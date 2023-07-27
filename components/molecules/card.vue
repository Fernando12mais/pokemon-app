<script setup lang="ts">
import { PokemonsSearchResponse } from "models/server/api/pokemon";

defineProps<{ pokemon: PokemonsSearchResponse[0]["pokemon"] }>();
</script>

<template>
  <NuxtLink
    :to="`/pokemon-${pokemon?.name}`"
    :class="`mx-auto flex w-full flex-col items-center rounded bg-action  p-3 text-white shadow-2-dp bg-pokemon-${$props.pokemon?.types?.[0].type.name}`"
  >
    <img v-if="$props.pokemon?.picture" :src="$props.pokemon.picture" />

    <p class="capitalize">{{ $props.pokemon?.name }}</p>
  </NuxtLink>
</template>
