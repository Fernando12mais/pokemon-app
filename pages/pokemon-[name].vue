<script setup lang="ts">
import { PokemonByNameResponse } from "models/server/api/pokemon";

const route = useRoute();
const pokemonName = route.params.name;
const capitalizedName = `${pokemonName[0].toUpperCase()}${pokemonName.slice(
  1,
)}`;

const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement;

  img.src = data.value?.alternatePicture as string;
};

useHead({
  title: `${capitalizedName}`,
  meta: [
    {
      name: "description",
      content: `The details and stats of ${capitalizedName}`,
    },
  ],
});

const { data, pending } = await useFetch<PokemonByNameResponse>(
  `/api/pokemon/${pokemonName}`,
  {
    lazy: true,
  },
);

const pokemonType = () => data.value?.types[0].type.name;

const header = ref<HTMLDivElement>();

onMounted(() => {
  if (!header.value) return;
  const element = header.value;

  const observer = new IntersectionObserver(
    ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1),
    { threshold: [1] },
  );
  observer.observe(element);

  return () => {
    observer.unobserve(element);
  };
});

onMounted(() => {
  console.log(pending.value);
});
</script>

<template>
  <TmpLoading :loading="pending" />

  <div
    v-if="!pending"
    :class="`min-h-screen bg-action bg-pokemon-${pokemonType()} flex flex-col `"
  >
    <header ref="header" class="flex items-center justify-center !px-1 pt-4">
      <div
        class="relative mx-auto flex max-w-screen-lg flex-1 flex-col items-center justify-center"
      >
        <NuxtLink class="absolute left-0 w-14" to="/home">
          <IconBack />
        </NuxtLink>
        <h1 class="mx-auto mb-2 capitalize text-grayscale-white headline">
          {{ pokemonName }}
        </h1>
      </div>
    </header>
    <div class="mx-auto flex max-w-screen-lg flex-1 flex-col">
      <main class="flex flex-1 flex-col justify-center p-4">
        <ClientOnly>
          <img
            @error="handleImageError"
            :src="data?.picture"
            width="200"
            height="200"
            class="z-10 mx-auto drop-shadow-xl lg:w-64"
          />
        </ClientOnly>
        <section
          class="relative mx-auto -translate-y-8 rounded bg-grayscale-white p-4 shadow-inner-2-dp lg:mt-0"
        >
          <div class="mt-16">
            <div class="flex flex-wrap justify-center gap-4">
              <AtmPokeType
                v-if="data?.types.length"
                v-for="{ type: { name } } in data?.types"
                :type="name"
              />
            </div>

            <h2 :class="`text-pokemon-${pokemonType()} my-4`">About:</h2>

            <div class="grid grid-cols-3">
              <div
                class="flex items-center justify-center gap-1 border-r border-r-black body-2"
              >
                <IconWeight :class="`fill-pokemon-${pokemonType()} w-8`" />

                <span>{{ data?.weight }} KG</span>
              </div>

              <div class="flex items-center justify-center gap-1 body-2">
                <IconMeasure :class="`fill-pokemon-${pokemonType()} w-8`" />

                <span>{{ data?.height }} M</span>
              </div>

              <ul class="list-inside list-disc border-l border-l-black">
                <li
                  class="ms-2 text-start capitalize body-2"
                  v-for="move in data?.abilities.slice(0, 3)"
                >
                  {{ move.ability.name }}
                </li>
              </ul>
            </div>

            <p class="mt-4 px-4 body-2">
              {{ data?.description }}
            </p>

            <h2 :class="`text-pokemon-${pokemonType()} my-4`">Base stats:</h2>
          </div>

          <OrgStats
            v-if="data?.stats.length"
            :stats="
              data.stats.map((stat) => ({
                type: pokemonType() || '',
                stat: stat,
              }))
            "
          />

          <div v-if="data?.evolution && data.evolution.length > 1">
            <h2 :class="`text-pokemon-${pokemonType()} my-4`">Evolution:</h2>

            <ul class="grid justify-center gap-4 sm:grid-cols-3">
              <div
                class="flex flex-col items-center justify-center sm:flex-row"
                v-for="(pokemon, index) in data.evolution"
              >
                <li
                  :class="`bg-pokemon-${pokemonType()} h-full rounded p-2 transition-all duration-200 hover:scale-105 hover:shadow-6-dp ${
                    pokemon.name == pokemonName && '!bg-action'
                  }`"
                >
                  <NuxtLink :to="`/pokemon-${pokemon.name}`">
                    <img :src="pokemon.picture" alt="evolution picture" />

                    <p class="text-grayscale-white">{{ pokemon.name }}</p>
                  </NuxtLink>
                </li>
              </div>
            </ul>
          </div>
        </section>
      </main>
    </div>
  </div>
</template>
