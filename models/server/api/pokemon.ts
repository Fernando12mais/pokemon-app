import type { Pokemon } from "pokedex-promise-v2";

export type PokemonByNameResponse = Pick<
  Pokemon,
  "abilities" | "stats" | "height" | "weight" | "types" | "name"
> & {
  description: string;
  picture: string;
};

export type PokemonsNamesResponse = {
  label: string;
  value: string;
}[];

export type PokemonsSearchResponse = {
  pokemon: Pick<Pokemon, "name" | "types"> & { picture: string };
}[];
