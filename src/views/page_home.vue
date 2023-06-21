<script setup>
import Navbar from '../components/navbar.vue';
import Intro from '../components/intro.vue';
import Foot from '../components/footer.vue';
import Announce from '../components/announcement.vue';
</script>

<template>
    <div id = "home">
        <Navbar/>
        <div class = "mx-auto py-12 bg-slate-100">
                <div class = 'w-full px-3 md:w-8/12 mb-3 mx-auto tracking-tight'>
                    <div class = 'bg-gradient-to-br from-orange-300 to-red-700 text-transparent bg-clip-text font-semibold text-3xl'>
                        CCU Pineapple Schedule
                    </div>
                    <div class = 'font-semibold text-3xl'>
                        鳳梨課表
                    </div>
                    <div class = 'text-xl text-gray-500 my-1'>
                        歡迎來到專屬於所有中正人的排課與課表製作網頁服務
                    </div>
                </div>
        </div>
        <Announce/>
        <Intro/>
        <Foot/>
    </div>
</template>