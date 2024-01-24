<template>
  <div id="home">
    <Navbar />
    <div class="mx-auto py-12 bg-slate-100">
      <div class="w-full px-3 md:w-8/12 mb-3 mx-auto tracking-tight">
        <div
          class="bg-gradient-to-br from-orange-300 to-red-700 text-transparent bg-clip-text font-semibold text-3xl"
        >
          CCU Class
        </div>
        <div class="font-semibold text-3xl">中正課表</div>
        <div class="text-xl text-gray-500 my-1">
          歡迎來到專屬於所有中正人的排課與課表製作網頁服務
        </div>
      </div>
    </div>

    <Notify />
    <Intro />
    <Foot />
  </div>
</template>

<script setup>
import Navbar from "@components/layout/navbar.vue";
import Foot from "@components/layout/footer.vue";
import Intro from "@components/pages/home/intro.vue";
import Notify from "@components/pages/home/notify.vue";

const visitCount = ref(0);

import { ref, onMounted, watch } from "vue";
import { getVisitCount, visitWeb } from "@functions/web_statistic.ts";
onMounted(async () => {
  let succ = await visitWeb("home");
  visitCount.value = await getVisitCount("home");
  console.log(`visitCount: ${visitCount.value}`);
});
</script>
