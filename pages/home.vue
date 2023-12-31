<script setup lang="ts">
import {
  PokemonsNamesResponse,
  PokemonsSearchResponse,
} from "models/server/api/pokemon";

let name = "";
let offset = 0;
const search = ref(`/api/search`);

const { data: pokemonNames, pending: loadingNames } =
  await useFetch<PokemonsNamesResponse>("/api/pokemons-names", { lazy: true });
const { data, pending } = await useFetch<PokemonsSearchResponse>(search, {
  lazy: true,
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
  window.scrollTo({ top: 0 });
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

onMounted(() => {
  name = getItem("name");
  offset = getItem("offset");
  search.value = `/api/search?offset=${offset}&name=${name}`;
});
</script>

<template>
  <TmpLoading :loading="loadingNames || pending" />
  <div
    v-if="!loadingNames && !pending"
    class="relative min-h-screen bg-identity-primary pb-4"
  >
    <MolHeader
      v-if="pokemonNames?.length"
      :items="pokemonNames"
      @on-search="onSearch"
    />

    <main class="mx-auto flex max-w-screen-2xl flex-col px-4">
      <div v-if="offset">
        <AtmButton class="mt-4" @on-click="goToFirstPage"
          >Go to first page</AtmButton
        >
      </div>
      <OrgCards
        :loading="pending"
        title="Pokémons"
        :pokemons="data?.pokemons || []"
      />
      <div class="mx-auto flex items-center gap-3">
        <AtmButton v-if="offset" @on-click="goToPreviousPage">Prev</AtmButton>
        <AtmButton
          v-if="
            data?.pokemons.length && data.itemsPerPage <= data.pokemons.length
          "
          @on-click="goToNextPage"
          >Next</AtmButton
        >
      </div>
    </main>
  </div>
</template>
