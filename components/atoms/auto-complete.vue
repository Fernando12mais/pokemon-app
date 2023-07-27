<script setup lang="ts">
type Item = {
  label: string;
  value: string;
};
export type AutoCompleteProps = {
  items: Item[];
  defaultValue?: Item;
};

import { ref, computed } from "vue";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
  TransitionRoot,
} from "@headlessui/vue";

const props = defineProps<AutoCompleteProps>();

const emits = defineEmits<{ onSearch: [value: string] }>();

const { debounce } = useDebounce();

const selected = ref(props.defaultValue);
const query = ref("");

const loading = ref(false);

const filteredItems = computed(() =>
  query.value === ""
    ? props.items
    : props.items.filter((person) =>
        person.value.toLowerCase().includes(query.value.toLowerCase()),
      ),
);

const cleanValues = () => {
  query.value = "";
  selected.value = { label: "", value: "" };
  emits("onSearch", selected.value.value);
};

watch(
  () => props.defaultValue,
  (newValue) => {
    selected.value = newValue;
  },
);
</script>

<template>
  <div class="relative z-10 flex w-full flex-col gap-1 text-xl">
    <Combobox
      v-model="selected"
      @update:model-value="
        (item) => {
          selected = item;
          emits('onSearch', item.value);
        }
      "
    >
      <div class="relative mt-1 flex flex-col items-center">
        <div class="relative w-full max-w-sm">
          <ComboboxInput
            autocomplete="off"
            v-bind="$attrs"
            class="w-full rounded border-none bg-grayscale-white p-3 text-grayscale-dark placeholder:text-grayscale-dark focus:outline focus:outline-2"
            :displayValue="(item: any) => item.label"
            @change="
              (event) => {
                loading = true;

                debounce(() => {
                  query = event.target.value;

                  if (event.target.value.length < 1) cleanValues();
                }, 600);
              }
            "
          />
          <button
            v-if="selected?.value.length"
            @click="cleanValues"
            class="absolute inset-y-0 right-0 flex h-full w-10 items-center justify-center pr-2"
          >
            <IconClose />
          </button>
        </div>
        <TransitionRoot
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
          @after-leave="query = ''"
        >
          <ComboboxOptions
            class="absolute top-full mt-1 max-h-60 w-full max-w-sm -translate-x-1/2 overflow-auto rounded-md bg-grayscale-medium py-1"
          >
            <div
              v-if="filteredItems.length === 0 && query !== ''"
              class="relative cursor-default select-none px-4 py-2 text-grayscale-white"
            >
              Sem resultados
            </div>

            <ComboboxOption
              v-for="item in filteredItems.slice(0, 10)"
              as="template"
              :key="item.value"
              :value="item"
              v-slot="{ selected, active }"
            >
              <li
                class="relative cursor-default select-none list-none py-2 pl-10 pr-4 text-xs"
                :class="{
                  'bg-action text-white': active,
                  'text-grayscale-white': !active,
                }"
              >
                <span
                  class="block truncate"
                  :class="{ 'font-medium': selected, 'font-normal': !selected }"
                >
                  {{ item.label }}
                </span>
              </li>
            </ComboboxOption>
          </ComboboxOptions>
        </TransitionRoot>
      </div>
    </Combobox>
  </div>
</template>
