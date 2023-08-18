<script setup>
import Navbar from '@components/layout/navbar.vue';
import Foot from '@components/layout/footer.vue';
import classTable from '@components/pages/main/classTable.vue';
import box from '@components/pages/main/search_box.vue';

</script>

<template>
    <div id = "main">
        <Navbar/>
        <box/>
        <classTable/>
        <Foot/>
    </div>
</template>