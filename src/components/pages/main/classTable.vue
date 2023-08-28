

<template>
    <div class = "overflow-x-auto">
        <div class = 'bg-orange-100 rounded-lg px-2 my-3 py-2 mx-auto shadow-lg md:w-6/12 min-w-[60rem]'>
            <p class = "text-right py-2 mx-3" v-show = "checked">
                目前學分: {{credit}}
            </p>
            <table class = 'bg-orange-100 border-separate w-full' id = "class_table">
                <thead>
                    <tr>
                        <th class = "w-[10px]">
                            ⠀
                        </th>
                        <th class = 'table-head w-36' colspan = "2">
                            節次
                        </th>   
                        <th class = 'table-head'>
                            星期一
                        </th>
                        <th class = 'table-head'>
                            星期二
                        </th>
                        <th class = 'table-head'>
                            星期三
                        </th>
                        <th class = 'table-head'>
                            星期四
                        </th>
                        <th class = 'table-head'>
                            星期五
                        </th>
                        <th class = 'table-head'>
                            星期六
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <!-- <tr v-for = "row in course_data">
                        <td v-for = "item in row" class = "text-center p-0 h-full overflow-auto" v-on:click = "show_popover()" :class = "{ title: item.getIsTitle(), course: item.getIsCourse() }" style = "height: 50px;">
                            <div> {{ item.getStartTime() }} </div>
                            <div> {{ item.getCourseName() }} </div>
                            <div> {{ item.getClassroom() }} </div>
                            
                        </td>
                    </tr>  -->
                    <tr v-for = "row in course_data" :key="row.id">
                        <courseCard v-for="item in row" :key="item.id" :item="item" />
                    </tr> 
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUpdated, ref, watch, reactive, computed } from 'vue';
import { Switch } from 'ant-design-vue'

import { Rowspanizer } from '@functions/rowspanizer';
import { Course, InitTable, GetCourseTable } from '@functions/general';
import { searchCourse, recordcourse } from '@functions/course_search.ts';
import { splittime } from '@functions/tool.ts';
import { courseDelete } from '@functions/course_delete.ts';

import { useStore } from 'vuex';

const store = useStore();
const status = computed(() => store.state.show);

//component
import courseCard from "@components/pages/main/courseCard.vue";
import comment from "@components/pages/main/comment.vue";

const env = import.meta.env;

let course_data = ref(GetCourseTable())

onMounted(() =>
{
    const temp = new Rowspanizer({
        target: "#class_table",
        colspan_index: 0
    })
    temp.rowspanize()
    // using env to control <ul> display
    let ul = document.getElementById("result");
    if(ul != null)
    {
        // ul's max-height is 2rem x env.VITE_UL_ROW
        ul.style.maxHeight = (2 * env.VITE_UL_ROW).toString() + "rem";
    }
})

var delete_course = function(item)
{
    // 刪除課程
    courseDelete(item)
    course_data.value = GetCourseTable()
    _2data_to_1d();
}


</script>
