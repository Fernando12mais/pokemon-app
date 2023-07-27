<script setup lang="ts">
import { PokemonsSearchResponse } from "models/server/api/pokemon";
export type CardsProps = {
  pokemons: PokemonsSearchResponse;
  title: string;
  loading: boolean;
};

defineProps<CardsProps>();
</script>

<template>
  <section class="mx-auto my-3 w-full rounded bg-grayscale-white p-3">
    <h1 class="my-4 headline">{{ title }}</h1>
    <div
      v-if="$props.pokemons.length && !$props.loading"
      class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
    >
      <MolCard v-for="{ pokemon } in $props.pokemons" :pokemon="pokemon" />
    </div>
    <AtmLoading v-if="$props.loading" class="mx-auto" />
  </section>
</template>
