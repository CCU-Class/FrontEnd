<template>
    <div class="z-10 top-0 left-0 w-screen h-screen fixed flex items-center backdrop-blur-sm">
        <div class="h-6/12 mx-auto bg-white px-3 py-2 rounded-lg drop-shadow-xl"> 
            <ColorPicker :color="color" 
                        default-format="rgb"
                        class="w-full mx-auto"
                        @color-change="updateColor" />
            <div class="mx-auto w-full h-full flex py-5">
                <button class="w-5/12 mx-auto hover:bg-gray-500 hover:text-white mx-2 py-1 duration-200 rounded-2xl" @click="cancel">取消</button>
                <button class="w-5/12 mx-auto hover:bg-gray-500 hover:text-white mx-2 py-1 duration-200 rounded-2xl" @click="confirm">確認</button>
            </div>
        </div>
    </div>
    
</template>


<style>
    .color-picker {
        width: 200%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
    }
</style>


<script setup>
    import {ColorPicker} from 'vue-accessible-color-picker';
    import {ref, computed, watch, onMounted} from 'vue';
    import store from '../../../store';
    import {courseChangeColor, courseTextChangeColor} from '../../../functions/course_color.ts'

    const env = import.meta.env;
    const color = ref(store.state.course.defaultColor);
    const defaultColor = computed(() => store.state.course.defaultColor);
    const show_colorpick = computed(() => store.state.course.show_ColorPick);
    watch(show_colorpick, () => {
        console.log('change')
        color.value = store.state.course.defaultColor;
    });
    const course = computed(() => store.state.course.chooseCard);
    const mode = computed(() => store.state.course.cardMode);
    // const defaultColor = computed(() => store.state.defaultColor);
    function updateColor (eventData) {
        color.value = eventData.cssColor
    }
    let cancel = function () {
        store.dispatch('changeShowColorPick', false);
    }
    let confirm = function () {
        // store.dispatch('setCardColor', color.value);
        if(mode.value == 1){
            courseChangeColor(course.value, color.value);
        }else if(mode.value == 2){
            
            courseTextChangeColor(course.value, color.value);
            
        }
        // color.value = env.VITE_CARD_DEFAULT_COLOR;
        store.dispatch('changeShowColorPick', false);
        
    }

</script>