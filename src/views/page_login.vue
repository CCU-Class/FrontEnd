<script setup>
import Navbar from '@components/layout/navbar.vue';
import Foot from '@components/layout/footer.vue';
import loginarea from '@components/pages/login/loginarea.vue';
import { ref , onMounted, watch} from 'vue';
import {getVisitCount, visitWeb} from "@functions/web_statistic.ts";
const visitCount = ref(0);
onMounted(async () => {
    // let succ = await visitWeb(); // 訪問網站 目前在後台測試已經成功
    visitCount.value = await getVisitCount();
});
</script>

<template>
    <div id = "Login">
        <Navbar/>
        <loginarea/>
        <Foot/>
    </div>
</template>