<script setup>
import Navbar from '../components/navbar.vue';
import Foot from '../components/footer.vue';
import Interact from '../components/interact.vue';
import classTableVue from '../components/classTable.vue';
</script>

<template>
    <div id = "main">
        <Navbar/>
        <Interact/>
        <classTableVue/>
        <Foot/>
    </div>
</template>