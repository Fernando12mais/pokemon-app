import { PokemonsSearchResponse } from "models/server/api/pokemon";
import pokedexApi from "~/libs/pokedex-api";
import getUrlImageFromPokemonId from "~/utils/get-url-image-from-pokemon-id";

export default defineEventHandler(async (event) => {
  try {
    const { offset, name } = getQuery(event);
    const quantity = 12;

    const pokemonsList = (await pokedexApi.getPokemonsList()).results.filter(
      ({ name }) => !name.includes("-"),
    );
    const index = pokemonsList.findIndex((list) =>
      list.name.includes(name?.toString() || ""),
    );

    const shortList = pokemonsList.slice(
      offset ? Number(offset) + index : index,
      offset ? Number(offset) + index + quantity : index + quantity,
    );

    const pokemons = await pokedexApi.getPokemonByName(
      shortList?.map((list) => list.name),
      (res, err) => {
        if (err) return [];
      },
    );

    const response: PokemonsSearchResponse = {
      pokemons: pokemons?.map((item) => ({
        pokemon: {
          alternatePicture: item.sprites.front_default as string,
          name: item.name,
          types: item.types,
          picture: getUrlImageFromPokemonId(
            item.id,
            "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/thumbnails-compressed/",
          ),
        },
      })),
      itemsPerPage: quantity,
    };

    return response;
  } catch (e: any) {
    return { message: e?.message };
  }
});
