<script setup lang="ts">
import { ref } from "vue";
import { LottieAnimation } from "lottie-web-vue";
import loading from "~/assets/animations/loading.json";

let anim = ref();
</script>
<template>
  <LottieAnimation
    class="w-40"
    ref="anim"
    :animation-data="loading"
    :loop="true"
    :auto-play="true"
  />
</template>
