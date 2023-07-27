<script setup lang="ts">
import { AutoCompleteProps } from "components/atoms/auto-complete.vue";

const emits = defineEmits<{ onSearch: [value: string] }>();
defineProps<{ items: AutoCompleteProps["items"] }>();

const { getItem, setItem } = useLocalStorage();
const header = ref<HTMLDivElement>();

const onSearch = (value: string) => {
  setItem("name", value);
  emits("onSearch", value);
};

const name = ref("");
onMounted(() => {
  name.value = getItem("name");

  if (!header.value) return;
  const element = header.value;

  const observer = new IntersectionObserver(
    ([e]) => e.target.classList.toggle("is-pinned", e.intersectionRatio < 1),
    { threshold: [1] },
  );
  observer.observe(element);

  return () => {
    observer.unobserve(element);
  };
});
</script>

<template>
  <div class="mb-2">
    <IconLogo />
  </div>
  <header class="sticky top-[-1px] z-10 px-4" ref="header">
    <nav class="flex flex-col gap-4">
      <div>
        <AtmAutoComplete
          :default-value="{ label: name, value: name }"
          @on-search="onSearch"
          :items="$props.items"
          placeholder="Search your pokemon here ..."
        />
      </div>
    </nav>
  </header>
</template>
