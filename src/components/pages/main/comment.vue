<template>
    <div class = "comment_inside overflow-y-auto overflow-x-hidden py-6 max-h-screen">
        <button v-on:click = "hidden" class = 'btn-normal mx-3'>關閉評價</button>
        <ul class = "mx-auto w-full">
            <li class = "w-full bg-white/70 px-1 py-1 hover:bg-orange-300 hover:text-white text-3xl" v-for="index in 15" :key="'index'">
                中正競程
            </li>
        </ul>
        
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();

const hidden = () =>
{
    store.dispatch("hidden")
};
</script>