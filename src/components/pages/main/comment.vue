<template>
    <div class = "comment_inside">
        <ul class = "mx-auto w-full overflow-y-auto overflow-x-hidden max-h-[40rem]">
            <li class = "w-full bg-white/70 px-1 py-1 hover:bg-orange-300 hover:text-white text-3xl" v-for="index in 20" :key="'index'">
                中正競程
            </li>
        </ul>
        <button v-on:click = "hidden" class = 'btn-normal min-w-[8rem] mx-3 my-3'>關閉評價</button>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';

const store = useStore();
const hidden = () =>
{
    store.dispatch("hidden")
};
</script>