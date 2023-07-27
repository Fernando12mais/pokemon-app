export default function (stat: number) {
  if (stat == 0) return 0;

  return Math.trunc((stat / 255) * 100);
}
