<template>
    <td class="text-center p-0 h-full  relative overflow-hidden card"
        :class="{ title: item.getIsTitle(), course: item.getIsCourse() }"
        style="height: 50px;"
        :style="{backgroundColor: item.getColor()}"
        @mouseenter="showButton = true" 
        @mouseleave="showButton =false" 
        v-if="item.getIsCourse()">
        <div class="card-content" @click="flip">
            <transition name="fliping" >
                <!-- 正面 -->
                <div :key="isFliped?'back':'front'" >
                    <div v-if="!isFliped" id="front">
                        <div> {{ item.getStartTime() }} </div>
                        <div> {{ item.getCourseName() }} </div>
                        <div> {{ item.getClassroom() }} </div>
                    </div>
                    <!-- 反面 -->
                    <div v-else id="back">
                        <div>
                            <commonOption @click.stop="delete_course_card(item)">刪除</commonOption>
                            <commonOption @click="openColorTemplate(item)">修改顏色</commonOption>
                            <!-- <colorTemplate v-show="isSelectingColor">
                                
                            </colorTemplate> -->
                        </div>
                    </div>
                </div>
                
            </Transition>
        </div>
    </td>




    <td class="text-center p-0 h-full overflow-auto "
        :class="{ title: item.getIsTitle(), course: item.getIsCourse() }"
        style="height: 50px;"
        :style="{backgroundColor: item.getColor()}"
        @mouseenter="showButton = true" 
        @mouseleave="showButton =false" v-if="!item.getIsCourse()">
        <div> {{ item.getStartTime() }} </div>
        <div> {{ item.getCourseName() }} </div>
        <div> {{ item.getClassroom() }} </div>
    </td>
</template>

<style>

    .card{
        cursor: pointer;
        justify-items: center;
        height: 100%;
        width: auto;
        justify-content: center;
        align-items: center;
        user-select: none;
        /* border:2px solid #9ed6a1; */
        z-index:1;
    }
    .card-content{
        justify-content: center;
        align-items: center;
        display:flex;
        width: 100%;
        height: 100%;
        max-width: 100%;
    }
    .card:hover{
        transition: 0.05s linear;
        transform: scale(1.25) ;
        z-index:2;
    }
    .fliping-enter-active {
        transition: all 0.15s ease;
    }
    .fliping-leave-active{
        transition: all 0.15s ease;
    }

    .fliping-enter {
        transform: rotateY(90deg);
        opacity: 0;
    }
    .fliping-leave-to {
        transform: rotateY(90deg);
        opacity: 0;
    }
    .fliping-enter-to{
        transform: rotateY(0);
        opacity: 1;
    }
    .fliping-leave  {
        transform: rotateY(0);
        opacity: 1;
    }

    
</style>

<script setup>
    import {ref, watch, computed} from "vue";
    import kebabButton from '@components/common/optionButton/kebabButton.vue';
    import commonOption from '@components/common/option/commonOption.vue';
    import colorTemplate from '@components/pages/main/colorTemplate.vue';
    import {Course} from '@functions/general.ts';
    import { courseDelete, decreaseCredit } from '@functions/course_delete.ts';
    import store from '../../../store';
    const env = import.meta.env;
    let isHovering = ref(false);
    let isFliped = ref(false);
    let isSelectingColor = ref(false);
    let showButton = ref(false);


    const props = defineProps({
        item: Course
    });
    const emit = defineEmits(['reload'])
    function show_popover() {
    }
    function mouseEnter(){
        isHovering.value = true;
    }
    function mouseLeave(){
        isHovering.value = false;
    }
    function flip(){
        isFliped.value = !isFliped.value;
        // console.log(`isFliped: ${this.isFliped}`);
    }
    function openColorTemplate(item){
        store.dispatch('changeShowColorPick', true);
        store.dispatch('setChooseCard', item);
        // await waitClick();
        // if(color != )
    }

    let delete_course_card = function(item){
        console.log(item);
        if(item.getCredit() != null){
            decreaseCredit(item.getCredit())
        }
        // 再刪除函式裡面去更改store狀態
        courseDelete(item);
        // course_data.value = GetCourseTable();
    }
</script>