import type { Pokemon } from "pokedex-promise-v2";

export type PokemonByNameResponse = Pick<
  Pokemon,
  "abilities" | "stats" | "height" | "weight" | "types" | "name"
> & {
  description: string;
  picture: string;
  alternatePicture: string;
  evolution: { name: string; picture: string }[];
};

export type PokemonsNamesResponse = {
  label: string;
  value: string;
}[];

export type PokemonsSearchResponse = {
  pokemons: {
    pokemon: Pick<Pokemon, "name" | "types"> & {
      picture: string;
      alternatePicture: string;
    };
  }[];
  itemsPerPage: number;
};
