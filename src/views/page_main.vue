<script setup>
import { computed, watch, ref, onMounted, onUnmounted } from 'vue'
import Navbar from '@components/layout/navbar.vue';
import Foot from '@components/layout/footer.vue';
import ClassTable from '@components/pages/main/classTable.vue';
import Box from '@components/pages/main/search_box.vue';
import comment from '@components/pages/main/comment.vue';
import inputArea from '@components/pages/main/inputArea.vue';
import Colorpick from '@components/pages/main/colorTemplate.vue';
import timeSelection from '@components/pages/main/timeSelection.vue';
import store from '../store';

const show_colorpick = computed(() => store.state.course.show_ColorPick);
const show_search_mode = computed(() => store.state.course.timeSearchMode);
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

const status = computed(() => store.state.course.show);

watch(status, async (val) => {
    if(val)
        document.body.style.overflow = "hidden";
    else
        document.body.style.overflow = "auto";
});


import {getVisitCount, visitWeb} from "@functions/web_statistic.ts";
const visitCount = ref(0);
onMounted(async () => {
    let succ = await visitWeb("main"); // 訪問網站 目前在後台測試已經成功
    visitCount.value = await getVisitCount("main");
    console.log(`visit count: ${visitCount.value}`);
    resizeObserver.observe(left.value);
});

onUnmounted(() => {
    resizeObserver.unobserve(left.value);
});

const left = ref();
const wid = ref();
const resizeObserver = new ResizeObserver(entries => {
    

    wid.value = entries.slice(-1)[0].target.clientWidth;
    
    // console.log(wid.value);
});

</script>

<template>
    <div id = "main" class="flex">
        <div>
            <Navbar/>
            <Box/>
            <splitpanes class = "bg-white">
                <pane class = "w-full" min-size = "50" size = "70">
                    <div class="h-full" :class="{ main_page_left: status}" ref="left">
                        <inputArea/>
                        <Colorpick v-show="show_colorpick"/>
                        <timeSelection :message="wid"/>
                        <classTable/>
                    </div>
                </pane>
                <pane v-if = "status" min-size = "30" max-size = "50" size = "30">
                    <comment />
                </pane>
            </splitpanes>
            <Foot/>
        </div>
    </div>
</template>