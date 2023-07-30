import { PokemonByNameResponse } from "models/server/api/pokemon";
import { EvolutionChain } from "pokedex-promise-v2";
import pokedexApi from "~/libs/pokedex-api";
import getUrlImageFromPokemonId from "~/utils/get-url-image-from-pokemon-id";

export default defineEventHandler(async (event) => {
  try {
    const name = event.context.params?.name;

    const pokemon = await pokedexApi.getPokemonByName(name || "");

    const data = await pokedexApi.getPokemonSpeciesByName(name || "");
    const evolutionChain: EvolutionChain = await fetch(
      data.evolution_chain?.url || "",
    ).then((res) => res.json());

    const pokemonNames = evolutionChain.chain.evolves_to.reduce(
      (acc: string[], item) => {
        acc.push(item.species.name);

        const firstEvolution = item.evolves_to?.[0];

        if (firstEvolution) {
          acc.push(firstEvolution.species.name);

          const secondEvolution = firstEvolution.evolves_to?.[0];

          if (secondEvolution) {
            acc.push(secondEvolution.species.name);
          }
        }

        return acc;
      },
      [],
    );

    pokemonNames.unshift(evolutionChain.chain.species.name);

    const evolutionPokemons = await pokedexApi.getPokemonByName(pokemonNames);

    const evolution = evolutionPokemons.map((pokemon) => ({
      name: pokemon.name,
      picture: getUrlImageFromPokemonId(
        pokemon.id,
        "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/",
      ),
    }));

    const description =
      data.flavor_text_entries
        .find((description) => description.language.name == "en")
        ?.flavor_text.replace(/\f/g, " ") || "";

    const response: PokemonByNameResponse = {
      name: pokemon.name,
      height: pokemon.height / 10,
      weight: pokemon.weight / 10,
      abilities: pokemon.abilities,
      stats: pokemon.stats,
      types: pokemon.types,
      description,
      picture: pokemon.sprites.other["official-artwork"].front_default || "",
      alternatePicture: pokemon.sprites.front_default as string,
      evolution,
    };

    return response;
  } catch (e: any) {
    return { message: e.message };
  }
});
