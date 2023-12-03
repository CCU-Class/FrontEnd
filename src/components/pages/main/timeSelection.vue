<template>
    <div class="z-30 top-0 left-0 w-screen h-screen fixed flex items-center backdrop-blur-sm" v-show="status">
        <div class="h-10/12 w-full md:w-6/12 mx-auto bg-white px-3 py-2 rounded-lg drop-shadow-xl"> 
            <div class="px-6 py-6">
                <div class="flex justify-between border-b border-b-purple-400 pb-2 mb-2">
                    <div class="text-2xl font-bold text-purple-500">課程時間搜尋</div>
                    <CloseCircleOutlined class="text-2xl font-bold cursor-pointer text-purple-900" @click="close"/>
                </div>
                <div class = "flex flex-row text-md">
                    <p class = "font-bold">搜尋的區間為: </p>
                    <p class = "mx-2">?</p>
                </div>
                <div class="flex justify-between">
                    
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { computed, watch, ref, onMounted } from 'vue'
const status = ref(true);
const close = () => {
    status.value = false;
}
</script>