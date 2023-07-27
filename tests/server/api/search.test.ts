import { describe, test, expect } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils";
import { PokemonsSearchResponse } from "models/server/api/pokemon";

describe("Tests for /pokemon-by-name route", async () => {
  await setup({
    server: true,
  });

  test("Should get pokemons when search is empty", async () => {
    const data: PokemonsSearchResponse = await $fetch("/api/search");
    expect(data.length).toBeGreaterThan(0);
  });

  test("Should get pokemons when sending pokemon name", async () => {
    const data: PokemonsSearchResponse = await $fetch(
      "/api/search?name=pikachu",
    );

    expect(data[0].pokemon.name).toBe("pikachu");
    expect(data.length).toBeGreaterThan(1);
  });
});
