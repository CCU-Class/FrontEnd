<template>
    <div class="w-full top-8 h-8 flex sticky" draggable="true">
        <div
            class="ml-auto text-orange-400 w-8 text-3xl relative small animate"
            ref="toolbox"
            @click="openSearch"
            @transitionend="transitionend"
        >
            <SearchOutlined class="absolute left-0 top-0" ref="searchBox" />
            <!-- <img src = "/search_box_icon.png" class = "ml-auto"> -->
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";

const count = ref(0);
const searchBox = ref(null);
const toolbox = ref(null);

const openSearch = () => {
    if (count.value === 0) {
        searchBox.value.classList.add("hidden");
        toolbox.value.classList.add("large");
        count.value = 1;
    } else {
        toolbox.value.classList.remove("large");
        count.value = 0;
    }
};

const transitionend = () => {
    if (count.value == 0) {
        searchBox.value.classList.remove("hidden");
    } else {
        
    }
};

</script>

<style>
.animate {
    transition: transform 0.3s ease;
}
.small {
    position: relative;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.large {
    transform: scale(10, 14) translateY(15px) translateX(-15px);
    border-radius: 0.10rem;
}
</style>
