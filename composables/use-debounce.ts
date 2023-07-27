export default function () {
  const timeoutRef = ref<NodeJS.Timeout>();

  function debounce(callback: () => void, time: number) {
    clearTimeout(timeoutRef.value);

    timeoutRef.value = setTimeout(callback, time);
  }
  return { debounce };
}
