import { PokemonsNamesResponse } from "models/server/api/pokemon";
import pokedexApi from "~/libs/pokedex-api";

export default defineEventHandler(async () => {
  try {
    const pokemonNames: PokemonsNamesResponse = (
      await pokedexApi.getPokemonsList()
    )?.results
      ?.map((result) => ({ label: result.name, value: result.name }))
      .filter((name) => !name.label.includes("-"));

    return pokemonNames;
  } catch (e: any) {
    return { message: e.message };
  }
});
