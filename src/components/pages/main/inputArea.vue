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
                        <option>以系所年級搜尋</option>
                        <option>以時間區間搜尋</option>
                        <option>以教師名稱搜尋</option>
                        <option>自定義新增課程</option>
                    </select>
                </div>
                <div class = 'flex flex-col py-1 mx-auto'>
                    <CourseName v-if = "searchType == '以課程名稱搜尋'" />
                    <Teacher v-if = "searchType == '以教師名稱搜尋'" />
                    <Department v-if="searchType == '以系所年級搜尋'"/>
                    <Time v-if = "searchType == '以時間區間搜尋'" />
                    <Custom v-if = "searchType == '自定義新增課程'" />
                </div>
                <hr class = 'mx-3 my-3 text-slate-300'>
                <div class = 'flex place-content-end items-center'>
                    <div class = "flex justify-between items-center" @click="toggleActive1 = !toggleActive1">
                        <div class = "w-12 h-6 flex items-center bg-gray-300 rounded-full duration-300 ease-in-out" :class="{ 'bg-orange-300': toggleActive1}">
                        <div class = "bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out" :class="{ 'translate-x-6': toggleActive1}"></div>
                        </div>
                        <span class = 'mx-3 py-1 min-w-[4rem]'>
                            顯示學分
                        </span>
                    </div>
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
                    <p class = "mx-3 my-2">
                        Hint: 課程教室、課程時間皆可<strong>點擊選擇</strong>顯示其他資訊
                    </p>
                    <table class = "w-full my-1 mb-1">
                        <thead>
                            <tr>
                                <th class = "text-center py-2 px-2 border-collapse bg-gray-200">
                                    課程名稱
                                </th>
                                <th class = "text-center py-2 px-2 border-collapse bg-gray-200">
                                    <select class = "custom" v-model="showListOptionDefault1">
                                        <option v-for="item in showListOption" :key="item.id" :value="item.id">{{ item.text }}</option>
                                    </select>
                                </th>
                                <th class = "text-center py-2 px-2 border-collapse bg-gray-200">
                                    <select class = "custom" v-model="showListOptionDefault2">
                                        <option v-for="item in showListOption" :key="item.id" :value="item.id">{{ item.text }}</option>
                                    </select>
                                </th>
                                <th class = "text-center py-2 px-2 border-collapse bg-gray-200">
                                    操作
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for = "item in filteredCourseList" class = "text-center py-2 px-2 border-collapse">
                                <td> {{ item.getCourseName() }} </td>
                                <td> {{ item.displayField1 }} </td>
                                <td> {{ item.displayField2 }} </td>
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
        <div class = "w-full md:w-9/12 mx-auto py-3" v-if = "searchType == '以時間區間搜尋'">
            
        </div>
    </div>    
</template>

<script setup>
import CourseName from '@components/pages/main/serach_modes/course_name.vue';
import Teacher from '@components/pages/main/serach_modes/teacher.vue';
import Time from '@components/pages/main/serach_modes/time.vue';
import Custom from '@components/pages/main/serach_modes/custom.vue';
import Department from '@components/pages/main/serach_modes/department.vue';

import { onMounted, onUpdated, ref, watch, reactive, computed } from 'vue';
import { Switch } from 'ant-design-vue'

import { rowspanize } from '@functions/rowspanizer';
import { Course, InitTable, GetCourseTable } from '@functions/general';
import { courseDelete, decreaseCredit } from '@functions/course_delete.ts';
import renderImage from '@functions/image_render.ts';

import { useStore } from 'vuex';

const store = useStore();
store.dispatch('initAll');
const status = computed(() => store.state.course.show);
const show_credit = computed(() => store.state.course.show_credit)
const open_credit = () => store.dispatch("show_credit");
const close_credit = () => store.dispatch("hidden_credit");
const setSearchTimeMode = (flag) => store.dispatch("setTimeSearchMode", flag);
let courseList = computed(() => store.state.course.classListStorage);
let credit = computed(() => store.state.course.credit);

const toggleActive1 = ref(false);
const toggleActive2 = ref(false);
const showListOption = [
    {'text' : '課程教室', 'value': item => item.getClassroom(), 'id': 0},
    {'text' : '課程教師', 'value': item => item.getTeacher(), 'id': 1},
    {'text' : '課程編號', 'value': item => item.getCourseID(), 'id': 2},
    {'text' : '課程時間', 'value': item => item.getStartTime(), 'id': 3},
    {'text' : '系所 / 向度', 'value': item => item.getDepartment(), 'id': 4},
    {'text' : '學分', 'value': item => item.getCredit(), 'id': 5}
]
const showListOptionDefault1 = ref(0);
const showListOptionDefault2 = ref(3);

const getDisplayField = (item, optionId) => {
    return showListOption.find(option => option.id === optionId).value(item);
}

const filteredCourseList = computed(() => {
    return courseList.value.map((item) => {
        item['displayField1'] = getDisplayField(item, showListOptionDefault1.value);
        item['displayField2'] = getDisplayField(item, showListOptionDefault2.value);
        return item;
    });
});

// 控制以系所查詢那邊的衝堂顯示要不要重新渲染
const setConflictState = (state) => store.dispatch("setrunConflictState", state);

const hidden = () =>
{
    store.dispatch("hidden");
};

//component
import courseCard from "@components/pages/main/courseCard.vue";

const searchType = ref("以課程名稱搜尋")

let class_list_visible = ref(false);
let show = computed(() => store.state.course.showTable);

// 這個是打開用時間搜尋的模式的
let opened = computed(() => store.state.course.timeSearchMode);

watch(searchType, async (inputValue) => {
    if(inputValue == "以時間區間搜尋")
    {
        setSearchTimeMode(true);
    }
    else
    {
        setSearchTimeMode(false);
    }
})

watch(toggleActive1, (inputValue) => {
    if(inputValue == true)
    {
        store.dispatch("show_credit");
    }
    else
    {
        store.dispatch("hidden_credit");
    }
})

var delete_course = async function(item)
{
    // 刪除課程
    await setConflictState(1);
    await setConflictState(2);
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


</script>
