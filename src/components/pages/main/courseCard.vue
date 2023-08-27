<template>
    <td class="text-center p-0 h-full  relative overflow-hidden card"
        :class="{ title: item.getIsTitle(), course: item.getIsCourse() }"
        style="height: 50px; "
        @mouseenter="showButton = true" 
        @mouseleave="showButton =false" 
        v-if="item.getIsCourse()">
        <kebabButton v-if="showButton">
            <commonOption>刪除</commonOption>
            <commonOption @click="openColorTemplate">修改顏色</commonOption>
            <colorTemplates v-show="isSelectingColor">
                
            </colorTemplates>
        </kebabButton>
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
                            back
                        </div>
                    </div>
                </div>
                
            </Transition>
        </div>
    </td>




    <td class="text-center p-0 h-full overflow-auto "
        :class="{ title: item.getIsTitle(), course: item.getIsCourse() }"
        style="height: 50px;"
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
        border:2px solid #9ed6a1;
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

<script>
    import {ref, watch} from "vue";
    import kebabButton from '@components/common/optionButton/kebabButton.vue';
    import commonOption from '@components/common/option/commonOption.vue';
    import colorTemplates from '@components/pages/main/colorTemplate.vue';
    import {Course} from '@functions/general.ts';
    let isHovering = ref(false);
    let isFliped = ref(false);
    let isSelectingColor = ref(false);
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
            },
            openColorTemplate(){
                this.isSelectingColor = true;
                console.log(`isSelectingColor: ${this.isSelectingColor}`);
            }
        },data(){
            return {
                showButton:false,
                isFliped: false,
                isSelectingColor: false
            }
        }
    };
</script>