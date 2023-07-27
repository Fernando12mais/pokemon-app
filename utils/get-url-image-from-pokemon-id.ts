export default function (id: number, url: string) {
  const pokemonId = id.toString();
  const paddedId = pokemonId?.padStart(Math.max(3, pokemonId.length), "0");

  return `${url}${paddedId}.png`;
}
