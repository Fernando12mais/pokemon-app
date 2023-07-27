<script setup lang="ts">
import { PokemonsSearchResponse } from "models/server/api/pokemon";

let name = "";
let offset = 0;
const search = ref(`/api/search`);
const loading = ref(true);

const { data: pokemonNames } = await useFetch("/api/pokemons-names");
const { data, pending } = await useFetch<PokemonsSearchResponse>(search, {
  server: false,
  immediate: false,
});

const { debounce } = useDebounce();
const { getItem, setItem } = useLocalStorage();

function onSearch(value: string) {
  search.value = `/api/search?name=${value}`;
  name = value;
  offset = 0;
  setItem("offset", offset);
}

function goToPreviousPage() {
  offset -= 20;
  setItem("offset", offset);

  search.value = `/api/search?offset=${offset}&name=${name}`;
}
function goToNextPage() {
  offset += 20;
  setItem("offset", offset);

  search.value = `/api/search?offset=${offset}&name=${name}`;

  window.scrollTo({ top: 0 });
}

function goToFirstPage() {
  offset = 0;
  setItem("offset", offset);
  search.value = `/api/search?offset=${offset}&name=${name}`;
}

watch(pending, (newValue) => {
  debounce(() => {
    loading.value = newValue;
  }, 70);
});

onMounted(() => {
  name = getItem("name");
  offset = getItem("offset");
  search.value = `/api/search?offset=${offset}&name=${name}`;
});
</script>

<template>
  <div class="relative min-h-screen bg-identity-primary pb-4">
    <MolHeader
      v-if="pokemonNames?.length"
      :items="pokemonNames"
      @on-search="onSearch"
    />

    <main class="mx-auto flex max-w-screen-2xl flex-col px-4">
      <div v-if="offset">
        <AtmButton @on-click="goToFirstPage">Go to first page</AtmButton>
      </div>
      <OrgCards :loading="loading" title="Pokémons" :pokemons="data || []" />
      <div class="mx-auto flex items-center gap-3">
        <AtmButton v-if="offset" @on-click="goToPreviousPage">Prev</AtmButton>
        <AtmButton
          v-if="data?.length && 12 < data.length"
          @on-click="goToNextPage"
          >Next</AtmButton
        >
      </div>
    </main>
  </div>
</template>
