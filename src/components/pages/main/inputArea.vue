<template>
    <div class = "input">
        <div class = "w-full mx-auto my-6 px-4 py-4 bg-gray-100 rounded-lg shadow-lg md:w-9/12 overflow-x-auto">
            <div class = 'text-xl font-semibold'>
                開始建置你的課表    
            </div>
            <div class = "my-2">
                <div class = 'flex flex-col py-1 w-40'>
                    <select class = 'mx-1 py-1 rounded-md text-center' v-model = "searchType">
                        <option selected>以課程名稱搜尋</option>
                        <option>以教師名稱搜尋</option>
                    </select>
                </div>
                <div class = 'flex flex-col py-1 mx-auto' v-if = "searchType == '以課程名稱搜尋'">
                    <div class = "flex flex-col w-full">
                        <div class = 'w-2/12 mx-3 py-2 font-semibold min-w-[4rem] -order-1 text-orange-500'>
                            以課程名稱進行搜尋
                        </div>
                        <input class = 'w-11/12 mx-auto py-1 text-center course_search' type = "search" placeholder = "使用課程名稱進行課程搜尋" v-model = "searchInput">
                        
                        <ul class = "mx-auto w-11/12 result-show overflow-y-auto overflow-x-hidden" ref="searchList" v-show="show_search_box">
                            <loadingSpinner v-if="isLoading" style="height: auto;"></loadingSpinner>
                            <li v-else v-for = "item in data" class = "w-full bg-white/70 px-1 py-1 hover:bg-orange-300 hover:text-white" @click="push_to_table(2, item)">
                                [{{item.id}}] {{item.class_name}} {{item.teacher}} {{item.class_time}} {{item.class_room}} 
                            </li>
                        </ul>
                    </div>
                </div>
                <div class = 'flex flex-col py-1 mx-auto' v-else-if = "searchType == '以教師名稱搜尋'">
                    <div class = "flex flex-col w-full">
                        <div class = 'w-2/12 mx-3 py-2 font-semibold min-w-[4rem] -order-1 text-green-500'>
                            以教師名稱進行搜尋
                        </div>
                        <input class = 'w-11/12 mx-auto py-1 text-center course_search' type = "search" placeholder = "使用教師名稱進行課程搜尋" v-model = "searchTeacher">
                        
                        <ul class = "mx-auto w-11/12 result-show overflow-y-auto overflow-x-hidden" ref="searchList" v-show="show_search_box">
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
                    <a-switch v-model:checked = "checked" v-on:change = "checked ? open_credit() : close_credit()" class = 'mx-3 py-1 min-w-[4rem]'></a-switch>
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
                    <p class = "text-right py-2 mx-3" v-show = "show_credit">
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
                            <tr v-for = "item in courseList" class = "text-center py-2 px-2 border-collapse">
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
</template>

<script setup>
import { onMounted, onUpdated, ref, watch, reactive, computed } from 'vue';
import { Switch } from 'ant-design-vue'

import { rowspanize } from '@functions/rowspanizer';
import { Course, InitTable, GetCourseTable } from '@functions/general';
import { searchCourse, recordcourse, searchByTeacher } from '@functions/course_search.ts';
import { splittime } from '@functions/tool.ts';
import { courseDelete, decreaseCredit } from '@functions/course_delete.ts';
import { courseAdd, searchAdd } from '@functions/course_add.ts';
import renderImage from '@functions/image_render.ts';

import { useStore } from 'vuex';
import {v4 as uuidv4} from 'uuid';

const store = useStore();
store.dispatch('initAll');
const status = computed(() => store.state.course.show);
const show_credit = computed(() => store.state.course.show_credit)
const open_credit = () => store.dispatch("show_credit");
const close_credit = () => store.dispatch("hidden_credit");
let course_data = computed(() => store.state.course.classStorage);
let courseList = computed(() => store.state.course.classListStorage);
let credit = computed(() => store.state.course.credit);
const hidden = () =>
{
    store.dispatch("hidden");
};

//component
import courseCard from "@components/pages/main/courseCard.vue";

const env = import.meta.env;

const week = ["一", "二", "三", "四", "五", "六"]
const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const className = ref()
const classRoom = ref()
const weekDay = ref("星期")
const start = ref("始堂")
const end = ref("終堂")
const searchType = ref("以課程名稱搜尋")
const searchInput = ref('');
const searchTeacher = ref('');
const isLoading = ref(false);
const isInputEmpty = ref(false);
let class_list_title = ["課程名稱", "課程教室", "課程時間", "操作"];
let class_list_visible = ref(false);
let checked = ref(false);
let show = computed(() => store.state.course.showTable);
let data = ref([]);
let show_search_box = ref(true);
let searchList = ref(null);

let inputValue = searchInput.value.trim();
let single_row_data = ref([])

watch(searchType, async (inputValue) => {
    show_search_box.value = false;
})

watch(searchInput, async (inputValue) => {
    show_search_box.value = true;
    if(inputValue != "")
    {   
        isLoading.value = true;
        show_search_box.value = true;
        // console.log(show_search_box.value)
        data.value = await searchCourse(inputValue);
        isLoading.value = false;
        if(searchList != null)
        {   
            // ul's max-height is 2rem x env.VITE_UL_ROW
            searchList.value.style.maxHeight = (2 * env.VITE_UL_ROW).toString() + "rem";
        }
    }
    else
    {
        isLoading.value = false;
        show_search_box.value = false;
    }
});

watch(searchTeacher, async (inputValue) => {
    show_search_box.value = true;
    if(inputValue != "")
    {   
        isLoading.value = true;
        show_search_box.value = true;
        // console.log(show_search_box.value)
        data.value = await searchByTeacher(inputValue);
        isLoading.value = false;
        if(searchList != null)
        {   
            // ul's max-height is 2rem x env.VITE_UL_ROW
            searchList.value.style.maxHeight = (2 * env.VITE_UL_ROW).toString() + "rem";
        }
    }
    else
    {
        isLoading.value = false;
        show_search_box.value = false;
    }
});

onMounted(() =>
{   
    // remerge_table();
    // using env to control <ul> display
    if(searchList != null)
    {   
        // ul's max-height is 2rem x env.VITE_UL_ROW
        searchList.value.style.maxHeight = (2 * env.VITE_UL_ROW).toString() + "rem";
    }
})

var delete_course = function(item)
{
    // 刪除課程
    // console.log(item);
    if(item.getCredit() != null){
        decreaseCredit(item.getCredit())
    }
    // 再刪除函式裡面去更改store狀態
    courseDelete(item);
}

var show_list = function() {
    // 顯示課程列表
    class_list_visible.value = !class_list_visible.value
}

function Sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}


var push_to_table = function(type, item) {
    // 手動新增課程
    // courseAdd(className.value: string, classRoom.value: string, weekDay.value: string, start.value: string, end.value: string)
    // console.log(48763);
    // console.log(48763);
    if(type == 1)
    {
        // check if the input is valid
        if(className.value == "" || classRoom.value == "" || weekDay.value == "星期" || start.value == "始堂" || end.value == "終堂")
        {   
            return;
        }

        let check = courseAdd(className.value, classRoom.value, weekDay.value, start.value, end.value);
        if(!check)
        {   
            alert("新增課程失敗，請檢查輸入資料是否正確");
            return;
        }
    }
    else if(type == 2)
    {
        // 從搜尋結果新增課程
        show_search_box.value = !show_search_box.value;
        // recordcourse(item)
        let time = splittime(item.class_time);
        // console.log(typeof(item.credit))
        let data = [];
        let Uuid = uuidv4();
        for(let i = 0; i < time.length; i++){
            data.push(new Course({
                start_time: time[i][1],
                end_time: time[i][2],
                week_day: time[i][0],
                course_name: item.class_name,
                classroom: item.class_room,
                is_title: false,
                is_course: true,
                color: env.VITE_CARD_DEFAULT_COLOR,
                Credit: item.credit,
                ID: item.id,
                is_custom: false,
                Teacher: item.teacher,
                Memo: null,
                textColor: env.VITE_CARDTEXT_DEFAULT_COLOR,
                textStyle: env.VITE_CARDTEXT_DEFAULT_STYLE,
                uuid: Uuid,
                length: 0
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
        store.dispatch('addCourseList', new Course({
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
            Memo: null,
            textColor: env.VITE_CARDTEXT_DEFAULT_COLOR,
            textStyle: env.VITE_CARDTEXT_DEFAULT_STYLE,
            uuid: Uuid,
            length: 0
        }));
        store.dispatch('addCredit', Number(item.credit));
        searchInput.value = "";
    }
    // 刷新網頁
    // window.location.reload();
}

var clearTable = function() {
    // 顯示確認視窗
    if(confirm("確定要清空課表嗎？"))
    {
        // 清空課表
        store.dispatch('clearCourse');
        window.location.reload();
    }
    
}
var download = function() {
    renderImage("WholeTable") // finish 
}

const state = reactive({
    checked: false
})


</script>
