<script setup>
import { computed } from 'vue'
import Navbar from '@components/layout/navbar.vue';
import Foot from '@components/layout/footer.vue';
import ClassTable from '@components/pages/main/classTable.vue';
import Box from '@components/pages/main/search_box.vue';
import comment from '@components/pages/main/comment.vue';
import Colorpick from '@components/pages/main/colorTemplate.vue';
import store from '../store';

const show_colorpick = computed(() => store.state.show_ColorPick);


</script>

<template>
    <div id = "main" class="flex relative">
        <div>
            <Navbar/>
            <!-- <Box/> -->
            <Colorpick v-show="show_colorpick"/>
            <ClassTable/>
            <Foot/>
        </div>
        <!-- <div id="box"></div> -->
        <!-- <comment/> -->
    </div>
</template>