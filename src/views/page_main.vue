<script setup>
import { computed, watch } from 'vue'
import Navbar from '@components/layout/navbar.vue';
import Foot from '@components/layout/footer.vue';
import ClassTable from '@components/pages/main/classTable.vue';
import Box from '@components/pages/main/search_box.vue';
import comment from '@components/pages/main/comment.vue';
import inputArea from '@components/pages/main/inputArea.vue';
import Colorpick from '@components/pages/main/colorTemplate.vue';
import store from '../store';

const show_colorpick = computed(() => store.state.show_ColorPick);
import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'

const status = computed(() => store.state.show);

watch(status, async (val) => {
    if(val)
        document.body.style.overflow = "hidden";
    else
        document.body.style.overflow = "auto";
});

</script>

<template>
    <div id = "main" class="flex relative">
        <div>
            <Navbar/>
            <Box/>
            <splitpanes class = "bg-white">
                <pane class = "w-full" min-size = "50" size = "70">
                    <div :class="{ main_page_left: status }">
                        <inputArea/>
                        <Colorpick v-show="show_colorpick"/>
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