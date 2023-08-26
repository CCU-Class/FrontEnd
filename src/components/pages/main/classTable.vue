

<template>
    <splitpanes class = "bg-white">
        <pane class = "w-full">
            <div class = "overflow-x-auto">
                <div class = "w-full mx-auto my-6 px-4 py-4 bg-gray-100 rounded-lg shadow-lg md:w-9/12">
                    <div class = 'text-xl font-semibold'>
                        開始建置你的課表    
                    </div>
                    <div class = "my-2">
                        <div class = 'flex flex-col py-1 mx-auto'>
                            <div class = "flex flex-col w-full">
                                <div class = 'w-2/12 mx-3 py-2 font-semibold min-w-[4rem] -order-1'>
                                    課程搜尋
                                </div>
                                <input class = 'w-11/12 mx-auto py-1 text-center course_search' type = "search" placeholder = "在此搜尋課程" v-model = "searchInput">
                                
                                <ul class = "mx-auto w-11/12 result-show overflow-y-auto overflow-x-hidden" id = "result" v-show="show_search_box">
                                    <loadingSpinner v-if="isLoading" style="height: auto;"></loadingSpinner>
                                    <li v-else v-for = "item in data" class = "w-full bg-white/70 px-1 py-1 hover:bg-orange-300 hover:text-white" @click="push_to_table(2, item)">
                                        [{{item.id}}] {{item.class_name}} {{item.teacher}} {{item.class_time}} {{item.class_room}} 
                                    </li>
                                </ul>
                                
                                
                                
                                
                            </div>
                        </div>
                        <div class = 'flex py-1 mx-auto'>
                        </div>
                        <div class = 'flex py-1 mx-auto items-center'>
                            <div class = 'mx-3 py-1 font-semibold min-w-[4rem]'>
                                課程資訊
                            </div>
                            <input class = 'mx-2 w-full md:w-4/12 py-1 rounded-md text-center' type = "text" placeholder = "課程名稱" v-model = "className"/>
                            <input class = 'mx-2 w-full md:w-3/12 py-1 rounded-md text-center' type = "text" placeholder = "課程教室" v-model = "classRoom"/>
                            <select class = 'mx-1 py-1 rounded-md text-center' v-model = "weekDay">
                                <option selected>星期</option>
                                <option v-for = "day in week" :value = "day">{{day}}</option>
                            </select>
                            <select class = 'mx-1 py-1 rounded-md text-center' v-model = "start">
                                <option selected>始堂</option>
                                <option v-for = "cla in classes" :value = "cla">{{cla}}</option>
                            </select>
                            <select class = 'mx-1 py-1 rounded-md text-center' v-model = "end">
                                <option selected>終堂</option>
                                <option v-for = "cla in classes" :value = "cla">{{cla}}</option>
                            </select>
                            <button class = 'btn-normal' v-on:click = "push_to_table(1)">
                                +
                            </button>
                        </div>
                        <hr class = 'mx-3 my-3 text-slate-300'>
                        <div class = 'flex place-content-end items-center'>
                            <a-switch v-model:checked = "state.checked">顯示學分</a-switch>
                            <span class = 'mx-3 py-1 min-w-[4rem]'>
                                顯示學分
                            </span>
                            <button class = 'btn-normal min-w-[8rem]' v-on:click = "show_list">
                                展開課程列表
                            </button>
                            <button class = 'btn-normal min-w-[4rem]' v-on:click = "clearTable">
                                清空課表
                            </button>
                            <button class = 'btn-normal min-w-[8rem]' v-on:click = "download">
                                下載課表
                            </button>
                        </div>
                        <div id = "class_list" v-if = "class_list_visible === true">
                            <p class = "text-right py-2 mx-3" v-show = "state.checked">
                                目前學分: {{credit}}
                            </p>
                            <table class = "w-full my-1 mb-1">
                                <thead>
                                    <tr>
                                        <th v-for = "title in class_list_title" class = "text-center py-2 px-2 border-collapse bg-gray-200">
                                            {{ title }}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for = "item in single_row_data" class = "text-center py-2 px-2 border-collapse">
                                        <td> {{ item.getCourseName() }} </td>
                                        <td> {{ item.getClassroom() }} </td>
                                        <td> {{ item.getStartTime() }} </td>
                                        <td>
                                            <button class = "bg-gray-700 py-2 my-1 px-6 rounded-lg text-white hover:bg-gray-500"
                                                v-on:click="delete_course(item)">
                                                刪除
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <div class = "overflow-x-auto">
                <div class = 'bg-orange-100 rounded-lg px-2 my-3 py-2 mx-auto shadow-lg md:w-6/12 min-w-[60rem]'>
                    <p class = "text-right py-2 mx-3" v-show = "state.checked">
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
                        <tbody v-if = "show">
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
        </pane>
        <pane v-if = "status">
            <span>
                <button v-on:click = "hidden" class = 'btn-normal min-w-[8rem] mx-3 my-3'>關閉評價</button>
            </span>
        </pane>
    </splitpanes>
</template>

<script setup>
import { onMounted, onUpdated, ref, watch, reactive, computed } from 'vue';
import { Switch } from 'ant-design-vue'

import { Rowspanizer } from '@functions/rowspanizer';
import { Course, InitTable, GetCourseTable } from '@functions/general';
import renderImage from "@functions/image_render.ts"
import { courseAdd, searchAdd } from "@functions/course_add.ts"
import { searchCourse, recordcourse } from '@functions/course_search.ts';
import { splittime } from '@functions/tool.ts';
import { courseDelete } from '@functions/course_delete.ts';



import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { useStore } from 'vuex';


const store = useStore();
store.dispatch('initCourseFromLocalstorage');
store.dispatch('initCourseListFromLocalstorage');
const status = computed(() => store.state.show);
let course_data = ref(store.state.classStorage)
let courseList = ref(store.state.classListStorage)
const hidden = () =>
{
    store.dispatch("hidden")
};

//component
import loadingSpinner from '@components/common/loadingSpinner.vue';
import courseCard from "@components/pages/main/courseCard.vue";

const env = import.meta.env;

const week = ["一", "二", "三", "四", "五", "六"]
const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const className = ref()
const classRoom = ref()
const weekDay = ref("星期")
const start = ref("始堂")
const end = ref("終堂")
const searchInput = ref('');
const isLoading = ref(false);
const isInputEmpty = ref(false);
let class_list_title = ["課程名稱", "課程教室", "課程時間", "操作"];
let class_list_visible = ref(false);
let checked = ref(false);
let credit = ref(0);
let show = ref(1);
let data = ref([]);
let show_search_box = ref(true);


let inputValue = searchInput.value.trim();
let single_row_data = ref([])


function _2data_to_1d()
{
    single_row_data.value = [];
    for(let i = 0; i < course_data.value.length; i++)
    {
        for(let j = 0; j < course_data.value[i].length; j++)
        {
            if(course_data.value[i][j].getIsCourse())
            {
                let check = true;
                for(let k = 0; k < single_row_data.value.length; k++)
                {   
                    if(single_row_data.value[k].getClassroom() == course_data.value[i][j].getClassroom() && single_row_data.value[k].getCourseName() == course_data.value[i][j].getCourseName() && single_row_data.value[k].getTeacher() == course_data.value[i][j].getTeacher())
                    {
                        check = false;
                        break;
                    }
                }
                if(check)
                {   
                    single_row_data.value.push(course_data.value[i][j]);
                }
            }
        }
    }
    for(let i = 0; i < single_row_data.value.length; i++){
        console.log(single_row_data.value[i])
    }
    for(let i = 0; i < courseList.value.length; i++){
        console.log(courseList.value[i])
    }
    for(let i = 0; i < single_row_data.value.length; i++){
        for(let j = 0; j < courseList.value.length; j++){
            if(single_row_data.value[i].getClassroom() == courseList.value[j].getClassroom() && single_row_data.value[i].getCourseName() == courseList.value[j].getCourseName() && single_row_data.value[i].getId() == courseList.value[j].getId()){
                single_row_data.value[i].setStartTime(courseList.value[j].getStartTime());
            }
        }
    }
}

watch(searchInput, async (inputValue) => {
    show_search_box.value = true;
    if(inputValue != "")
    {   
        
        isLoading.value = true;
        show_search_box.value = true;
        console.log(show_search_box.value)
        data.value = await searchCourse(inputValue);
        isLoading.value = false;
    }
    else
    {
        isLoading.value = false;
        show_search_box.value = false;
    }
});


onMounted(() =>
{   
    remerge_table();
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
    console.log(item);
    // 再刪除函式裡面去更改store狀態
    courseDelete(item);
    course_data.value = GetCourseTable();
    _2data_to_1d();
}

var show_popover = function() {
    // 顯示 popover
    let popover = document.getElementById("popover");
    popover.classList.remove("hidden");
    popover.classList.add("block");
}

var show_list = function() {
    // 顯示課程列表
    _2data_to_1d();
    class_list_visible.value = !class_list_visible.value
}

function Sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}

function remerge_table(){
    const temp = new Rowspanizer({
        target: "#class_table",
        colspan_index: 0
    })
    temp.rowspanize()
}

async function refresh_table(){
    return new Promise(async (resolve, reject) => {
        show.value = !show.value;
        await Sleep(20);
        show.value = !show.value;
        resolve();
    });
}

var push_to_table = async function(type, item) {
    // 手動新增課程
    // courseAdd(className.value: string, classRoom.value: string, weekDay.value: string, start.value: string, end.value: string)
    // console.log(48763);
    // console.log(48763);
    if(type == 1)
    {
        // check if the input is valid
        if(className.value == "" || classRoom.value == "" || weekDay.value == "星期" || start.value == "始堂" || end.value == "終堂")
        {   
            refresh_table();
            return;
        }

        let check = courseAdd(className.value, classRoom.value, weekDay.value, start.value, end.value);
        if(!check)
        {   
            alert("新增課程失敗，請檢查輸入資料是否正確");
            return;
        }
        courseList.value = store.state.classListStorage;
        await refresh_table();
        course_data.value = check;
    }
    else if(type == 2)
    {
        // 從搜尋結果新增課程
        show_search_box.value = !show_search_box.value;
        console.log(item);
        recordcourse(item)
        courseList.value.push(new Course({
            start_time: item.class_time,
            end_time: item.class_time,
            week_day: item.class_time,
            course_name: item.class_name,
            classroom: item.class_room,
            is_title: false,
            is_course: true,
            color: env.VITE_CARD_DEFAAULT_COLOR,
            Credit: item.credit,
            ID: item.id,
            is_custom: false,
            Teacher: item.teacher,
            Memo: null
        }))
        store.dispatch('addCourseList', courseList.value);
        let time = splittime(item.class_time);
        console.log(time)
        let data = [];
        for(let i = 0; i < time.length; i++){
            data.push(new Course({
                start_time: time[i][1],
                end_time: time[i][2],
                week_day: time[i][0],
                course_name: item.class_name,
                classroom: item.class_room,
                is_title: false,
                is_course: true,
                color: env.VITE_CARD_DEFAAULT_COLOR,
                Credit: item.credit,
                ID: item.id,
                is_custom: false,
                Teacher: item.teacher,
                Memo: null
            }));
        }
        // 成功插入會回傳課程陣列，反之回傳false
        // 在做儲存
        let check = searchAdd(data);
        if(!check)
        {   
            alert("新增課程失敗，請檢查是否衝堂");
            return;
        }
        await refresh_table();
        course_data.value = check;
    }
    await Sleep(30);
    _2data_to_1d();
    remerge_table();
    await Sleep(10);
    // 刷新網頁
    // window.location.reload();
}

var clearTable = function() {
    // 顯示確認視窗
    if(confirm("確定要清空課表嗎？"))
    {
        // 清空課表
        store.dispatch('clearCourse');
        course_data.value = store.state.classStorage;
        window.location.reload();
    }
    
}
var download = function() {
    renderImage("class_table") // finish 
}
const state = reactive({
    checked: false
})

</script>
