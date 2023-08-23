<script setup>
import Navbar from '@components/layout/navbar.vue';
import Foot from '@components/layout/footer.vue';
import classTable from '@components/pages/main/classTable.vue';
import Box from '@components/pages/main/search_box.vue';
import comment from '@components/pages/main/comment.vue';



</script>

<template>
    <div id = "main" class="flex">
        <div>
            <Navbar/>
            <Box/>
            <classTable/>
            <Foot/>
        </div>
        <div id="box"></div>
        <!-- <comment/> -->
    </div>
</template>