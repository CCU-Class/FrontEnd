<template>
  <div id="home">
    <Navbar />
    <div class="w-full bg-gradient-to-b from-orange-50 to-white py-16 border-b border-orange-100">
      <div class="max-w-4xl mx-auto px-4 text-center">
        <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          <span class="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
            CCU Class
          </span>
        </h1>
        <p class="text-xl text-gray-500 font-light max-w-2xl mx-auto">
          歡迎來到專屬於所有中正人的排課與課表製作網頁服務，<br>讓選課不再是難事。
        </p>
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
