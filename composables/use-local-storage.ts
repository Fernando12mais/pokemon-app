export default function () {
  function setItem(key: string, value: unknown) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  function getItem(key: string) {
    const item = localStorage.getItem(key);

    if (item) return JSON.parse(item);

    return "";
  }

  return { getItem, setItem };
}
