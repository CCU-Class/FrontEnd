<script setup>
import { computed, watch, ref, onMounted, onUnmounted } from "vue";
import Navbar from "@components/layout/navbar.vue";
import Foot from "@components/layout/footer.vue";
import ClassTable from "@components/pages/main/classTable.vue";
import comment from "@components/pages/main/comment.vue";
import inputArea from "@components/pages/main/inputArea.vue";
import Colorpick from "@components/pages/main/colorTemplate.vue";
import timeSelection from "@components/pages/main/timeSelection.vue";
import Modal from "@components/pages/main/modal.vue";
import course_tab from "@components/pages/main/course_tab.vue";
import store from "../store";

import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";

const status = computed(() => store.state.course.show);

watch(status, async (val) => {
  if (val) document.body.style.overflow = "hidden";
  else document.body.style.overflow = "auto";
});

import { getVisitCount, visitWeb } from "@functions/web_statistic.ts";
const visitCount = ref(0);

onUnmounted(() => {
  document.body.style.overflow = "auto";
});

onMounted(async () => {
  let succ = await visitWeb("main"); // 訪問網站 目前在後台測試已經成功
  visitCount.value = await getVisitCount("main");
  console.log(`visit count: ${visitCount.value}`);
});
</script>

<template>
  <div
    id="main"
    class="flex w-full min-w-0 max-w-full overflow-x-clip">
    <div class="w-full min-w-0">
      <Navbar />
      <splitpanes class="w-full min-w-0 bg-white">
        <pane class="w-full min-w-0" min-size="50" size="70">
          <div
            class="h-full w-full min-w-0"
            :class="{ main_page_left: status }">
            <inputArea />
            <Colorpick />
            <course_tab />
            <timeSelection />
            <classTable />
          </div>
        </pane>
        <pane v-if="status" min-size="30" max-size="50" size="30">
          <comment />
        </pane>
      </splitpanes>
      <Foot />
    </div>
  </div>
  <Modal />
</template>
