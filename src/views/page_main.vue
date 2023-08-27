<script setup>
import Navbar from '@components/layout/navbar.vue';
import Foot from '@components/layout/footer.vue';
import classTable from '@components/pages/main/classTable.vue';
import Box from '@components/pages/main/search_box.vue';
import comment from '@components/pages/main/comment.vue';

import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { useStore } from 'vuex';
import { computed, watch } from 'vue';

const store = useStore();
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
                <pane class = "w-full max-h-screen overflow-y-auto" min-size = "40">
                    <classTable/>
                </pane>
                <pane v-if = "status" min-size = "30">
                    <comment />
                </pane>
            </splitpanes>
            <Foot/> 
        </div>
    </div>
</template>