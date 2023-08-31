<template>
    <button type="button" class="optionButtion" v-on:click="showOption()">&#xFE19;</button>
    <div>
        <ul id="content-list" v-if="isShowOption" class="mx-auto option-list bg-white " @mouseleave="isShowOption=false" >
            <div>
                <slot>

                </slot>
            </div>
            
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
        width: auto;
        right: 0.3rem;
        top: 0.3rem;
        z-index: 2;
        transform: translate(0, 0.01rem);
        text-align: left;
        border: 2px gray solid;
    }
    .option:hover{
        background-color: #e2e8f0;
    }
</style>

<script setup>
    import { onMounted, onUpdated, ref, watch, reactive, computed } from 'vue';
    let isShowOption = ref(false);
    function showOption() {
        isShowOption.value = true;
    }
    
</script>