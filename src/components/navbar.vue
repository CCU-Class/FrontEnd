<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
</script>

<template>
    <div class = "z-40 bg-orange-200 px-3 py-3 flex items-center place-content-between">
        <router-link to = "/">
            <div class = "font-bold text-2xl bg-gradient-to-br from-orange-300 to-red-700 text-transparent bg-clip-text">
                鳳梨課表
            </div>
        </router-link>
        <div class = "text-md hidden md:block">
            <router-link to = "/" class = "btn-head">
                首頁
            </router-link>
            <router-link to = "/main" class = "btn-head">
                開始使用
            </router-link>
        </div>
        <div class = 'block md:hidden'>
            <!-- navbar collapse icon -->
            <button type = 'button' class = 'py-2 px-2 rounded text-black' v-on:click = "collapse">
                <svg xmlns = "http://www.w3.org/2000/svg" class = "h-6 w-6" fill = "none" viewBox = "0 0 24 24" stroke = "currentColor" stroke-width = "2">
                    <path stroke-linecap = "round" stroke-linejoin = "round" d = "M4 6h16M4 10h16M4 14h16M4 18h16"/>
                </svg>
            </button>
        </div>
    </div>
        <div class = 'z-0 block w-full bg-orange-200 md:hidden' v-if = "view === 2">
            <div class = 'grid grid-cols-1 w-10/12 mx-auto'>
                <router-link to = "/" class = "btn-head-mobile">
                    首頁
                </router-link>
                <router-link to = "/main" class = "btn-head-mobile">
                    開始使用
                </router-link>
            </div>
        </div>
</template>

<script>
import { ref } from "vue"
let view = ref(1)
const collapse = function(){
    (view.value != 2) ? view.value = 2 : view.value = 1;
}
</script>
