<template>
    <button type="button" class="optionButtion" v-on:click="showOption()">&#xFE19;</button>
    <div>
        <ul id="content-list" v-if="isShowOption" class="mx-auto option-list bg-white " @mouseleave="isShowOption=false" >
            <slot class="w-full bg-white/70 px-1 py-1">

            </slot>
        </ul>
    </div>
    
    
</template>

<style>
    .optionButtion{
        position:absolute;
        right: 0;
        top: 0;
        z-index: 1;
        transform: translate(0, 0.5rem);
        font-size: 150%;
    }
    .option-list{
        position: absolute;
        width: 50%;
        right: 0;
        top: 0;
        z-index: 2;
        transform: translate(0, 0.01rem);
        text-align: left;
    }
</style>

<script setup>
    import { onMounted, onUpdated, ref, watch, reactive, computed } from 'vue';
    let isShowOption = ref(false);
    function showOption() {
        isShowOption.value = true;
    }
    
</script>