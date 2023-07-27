<script setup lang="ts">
import { Pokemon } from "pokedex-promise-v2";

const route = useRoute();
const pokemonName = route.params.name;
const capitalizedName = `${pokemonName[0].toUpperCase()}${pokemonName.slice(
  1,
)}`;

useHead({
  title: `${capitalizedName}`,
  meta: [
    {
      name: "description",
      content: `The details and stats of ${capitalizedName}`,
    },
  ],
});

const { data } = await useFetch<
  Pokemon & { description: string; picture: string }
>(`/api/pokemon/${pokemonName}`);

onMounted(() => {
  console.log(data.value);
});
</script>

<template>
  <div
    :class="`min-h-screen bg-action bg-pokemon-${data?.types[0].type.name} flex flex-col `"
  >
    <div class="mx-auto flex max-w-screen-lg flex-1 flex-col">
      <header class="relative flex items-center justify-center pt-4">
        <NuxtLink class="absolute left-0 w-14" to="/home">
          <IconBack />
        </NuxtLink>
        <h1 class="mx-auto mb-2 capitalize text-grayscale-white headline">
          {{ pokemonName }}
        </h1>
      </header>
      <main class="flex flex-1 flex-col justify-center p-4">
        <img
          :src="data?.picture"
          width="200"
          height="200"
          class="z-10 mx-auto drop-shadow-xl lg:w-64"
        />
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

            <h2 :class="`text-pokemon-${data?.types[0].type.name} my-4`">
              About:
            </h2>

            <div class="grid grid-cols-3">
              <div
                class="flex items-center justify-center gap-1 border-r border-r-black body-2"
              >
                <IconWeight
                  :class="`fill-pokemon-${data?.types[0].type.name} w-8`"
                />

                <span>{{ data?.weight }} KG</span>
              </div>

              <div class="flex items-center justify-center gap-1 body-2">
                <IconMeasure
                  :class="`fill-pokemon-${data?.types[0].type.name} w-8`"
                />

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

            <p class="mt-4 px-4 body-2" @click="() => console.log(data)">
              {{ data?.description }}
            </p>

            <h2 :class="`text-pokemon-${data?.types[0].type.name} my-4`">
              Base stats:
            </h2>
          </div>

          <OrgStats
            v-if="data?.stats.length"
            :stats="
              data.stats.map((stat) => ({
                type: data?.types[0].type.name || '',
                stat: stat,
              }))
            "
          />
        </section>
      </main>
    </div>
  </div>
</template>
