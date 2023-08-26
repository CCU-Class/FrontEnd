<template>
    
    <td class="text-center p-0 h-full overflow-auto relative "
        :class="{ title: item.getIsTitle(), course: item.getIsCourse() }"
        style="height: 50px; overflow:hidden;"
        @mouseenter="showButton = true" 
        @mouseleave="showButton =false" >
        <kebabButton v-if="item.getIsCourse() && showButton">
            <commonOption>刪除</commonOption>
            <commonOption>修改顏色</commonOption>
        </kebabButton>
        <div class="card" v-if="item.getIsCourse()" @click="flip" >
            <transition name="fliping">
                <!-- 正面 -->
                <div :key="isFliped?'back':'front'" class="card-content">
                    <div v-if="!isFliped" style="width: auto;" id="front">
                        <div> {{ item.getStartTime() }} </div>
                        <div> {{ item.getCourseName() }} </div>
                        <div> {{ item.getClassroom() }} </div>
                    </div>
                    <!-- 反面 -->
                    <div v-else id="back">
                        <div>
                            <div> 更改顏色 </div>
                            <div> 刪除 </div>
                        </div>
                    </div>
                </div>
                
            </Transition>
        </div>
        <div v-else>
            <div> {{ item.getStartTime() }} </div>
            <div> {{ item.getCourseName() }} </div>
            <div> {{ item.getClassroom() }} </div>
        </div>
    </td>
</template>

<style>
    .card{
        cursor: pointer;
        justify-items: center;
        height: 100%;
        width: 100%;
        white-space: nowrap;
        justify-content: center;
        align-items: center;
    }
    .card-content{
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .card:hover{
        transition: 0.05s linear;
        transform: scale(1.2);
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

<script>
    import {ref, watch} from "vue";
    import kebabButton from '@components/common/optionButton/kebabButton.vue';
    import commonOption from '@components/common/option/commonOption.vue';
    import {Course} from '@functions/general.ts';
    let isHovering = ref(false);
    let isFliped = ref(false);
    export default {
        props: {
            item: Course // 传入单元格数据的 prop
        },
        methods: {
            show_popover() {
            },
            mouseEnter(){
                isHovering.value = true;
            },
            mouseLeave(){
                isHovering.value = false;
            },
            flip(){
                this.isFliped = !this.isFliped;
                console.log(`isFliped: ${this.isFliped}`);
            }
        },data(){
            return {
                showButton:false,
                isFliped: false,
            }
        }
    };
</script>