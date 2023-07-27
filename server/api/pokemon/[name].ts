import { PokemonByNameResponse } from "models/server/api/pokemon";
import pokedexApi from "~/libs/pokedex-api";
import getUrlImageFromPokemonId from "~/utils/get-url-image-from-pokemon-id";

export default defineEventHandler(async (event) => {
  try {
    const name = event.context.params?.name;

    const pokemon = await pokedexApi.getPokemonByName(name || "");

    const data = await pokedexApi.getPokemonSpeciesByName(name || "");

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
      picture: getUrlImageFromPokemonId(
        pokemon.id,
        "https://raw.githubusercontent.com/HybridShivam/Pokemon/master/assets/images/",
      ),
      alternatePicture: pokemon.sprites.front_default as string,
    };

    return response;
  } catch (e: any) {
    console.log(e.message);
    return { message: e.message };
  }
});
