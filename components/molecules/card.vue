<script setup lang="ts">
import { PokemonsSearchResponse } from "models/server/api/pokemon";

const props = defineProps<{ pokemon: PokemonsSearchResponse[0]["pokemon"] }>();

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;

  img.src = props.pokemon.alternatePicture;
};
</script>

<template>
  <NuxtLink
    :to="`/pokemon-${pokemon?.name}`"
    :class="`mx-auto flex w-full flex-col items-center rounded bg-action p-3  text-white shadow-2-dp transition-all duration-200 hover:scale-105 hover:shadow-6-dp bg-pokemon-${$props.pokemon?.types?.[0].type.name}`"
  >
    <ClientOnly>
      <img
        v-if="$props.pokemon?.picture"
        :src="$props.pokemon.picture"
        @error="handleImageError"
      />
    </ClientOnly>
    <p class="capitalize">{{ $props.pokemon?.name }}</p>
  </NuxtLink>
</template>
