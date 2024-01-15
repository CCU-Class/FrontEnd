<template>
    <td v-if="item.getIsCourse()"
        v-show="item.getLength()"
        class="text-center p-0 h-full  relative overflow-hidden card"
        :class="{ title: item.getIsTitle(), course: item.getIsCourse() }"
        style="height: 50px;"
        :style="{backgroundColor: item.getColor(), color: item.getTextColor(), display: item.getLength()}"
        :rowspan="item.getLength()"
        @mouseenter="showButton = true" 
        @mouseleave="showButton = false" 
        >
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
                            <commonOption @click="openColorTemplate(item, 1)">修改顏色</commonOption>
                            <commonOption @click="openColorTemplate(item, 2)">文字樣式</commonOption>
                            <commonOption @click="openComment(item)">查看評價</commonOption>
                            <!-- <colorTemplate v-show="isSelectingColor">
                                
                            </colorTemplate> -->
                        </div>
                    </div>
                </div>
                
            </Transition>
        </div>
    </td>




    <td v-if="!item.getIsCourse()"
        v-show="item.getLength()"
        class="text-center p-0 h-full overflow-auto rounded-lg"
        :class="{ title: item.getIsTitle(), course: item.getIsCourse() }"
        style="height: 50px;"
        :rowspan="item.getLength()"
        :style="{backgroundColor: item.getColor(), color: item.getTextColor()}"
        @mouseenter="showButton = true" 
        @mouseleave="showButton =false">
        <div> {{ item.getStartTime() }} </div>
        <div> {{ item.getCourseName() }} </div>
        <div> {{ item.getClassroom() }} </div>
    </td>
</template>

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
    function openColorTemplate(item, mode){
        // 1是卡片顏色，2是文字顏色
        if(mode == 1){
            store.dispatch('setDefaultColor', env.VITE_CARD_DEFAULT_COLOR);
        }
        else if(mode == 2){
            store.dispatch('setDefaultColor', env.VITE_CARDTEXT_DEFAULT_COLOR);
        }
        store.dispatch('setCardMode', mode);
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
    let openComment = function(item){
        let courseid = item.getId();
        window.scrollTo(0, 0);
        store.dispatch("pass_course_id", courseid);
        store.dispatch("display");
    }
</script>