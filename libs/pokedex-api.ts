import Pokedex from "pokedex-promise-v2";

const pokedexApi = new Pokedex({
  versionPath: "/api/v2/",
  cacheLimit: 100 * 1000,
  timeout: 5 * 1000,
});
export default pokedexApi;
