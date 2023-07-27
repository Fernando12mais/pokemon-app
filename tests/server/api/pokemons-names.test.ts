import { describe, test, expect } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils";
import { PokemonsNamesResponse } from "models/server/api/pokemon";

describe("Tests for /pokemon-names route", async () => {
  await setup({
    server: true,
  });

  test("Should get all pokemon names", async () => {
    const data: PokemonsNamesResponse = await $fetch("/api/pokemons-names");
    expect(data.length).toBeGreaterThan(0);
  });
});
