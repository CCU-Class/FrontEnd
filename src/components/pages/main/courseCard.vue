<template>
    <td class="text-center p-0 h-full overflow-auto relative"
        :class="{ title: item.getIsTitle(), course: item.getIsCourse() }"
        style="height: 50px;"
        @mouseenter="showButton = true"
        @mouseleave="showButton =false">


        <kebabButton v-if="item.getIsCourse()">
            <li>刪除</li>
        </kebabButton>
        <div> {{ item.getStartTime() }} </div>
        <div> {{ item.getCourseName() }} </div>
        <div> {{ item.getClassroom() }} </div>

        <!-- <div id="popover" class="hidden absolute bg-white border p-4 shadow-md">
        Popover 內容
        This is a popover content.
        </div> -->
    </td>
</template>

<style>
    
</style>

<script>
    import kebabButton from '@components/common/optionButton/kebabButton.vue';
    import {Course} from '@functions/general.ts';

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
            }
        },data(){
            return {
                showButton:false,
            }
        }
    };
</script>