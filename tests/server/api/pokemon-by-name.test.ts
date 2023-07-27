import { describe, test, expect } from "vitest";
import { setup, $fetch } from "@nuxt/test-utils";
import { PokemonByNameResponse } from "models/server/api/pokemon";

describe("Tests for /pokemon-by-name route", async () => {
  await setup({
    server: true,
  });

  test("Should get pokemon by its name", async () => {
    const data: PokemonByNameResponse = await $fetch("/api/pokemon/pikachu");
    expect(data.name).toBe("pikachu");
  });
});
