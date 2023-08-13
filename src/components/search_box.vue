<template>
    <div class="w-full top-8 h-8 flex sticky" draggable="true">
        <div class = "ml-auto text-orange-400 w-8 text-3xl" ref="toolbox" v-on:click="open_search()">
            <SearchOutlined ref="searchBox" />
        <!-- <img src = "/search_box_icon.png" class = "ml-auto"> -->
        </div>
    </div>
    <div>
    </div>
</template> 

<script setup>
import {ref } from "vue";

let count = ref(0);
let searchBox = ref(null);
let toolbox = ref(null);
let open_search = function(){
    if(count.value == 0){
        searchBox.value.classList.add('hidden');
        toolbox.value.classList.remove('w-8');
        toolbox.value.classList.add('w-28');
        toolbox.value.classList.add('h-28');
        toolbox.value.classList.add('bg-black');
        count.value = 1;
    }
    else{
        searchBox.value.classList.remove('hidden');
        toolbox.value.classList.remove('bg-black');
        toolbox.value.classList.add('w-8');
        toolbox.value.classList.remove('w-28');
        toolbox.value.classList.remove('h-28');
        count.value = 0;
    }
}

</script>
