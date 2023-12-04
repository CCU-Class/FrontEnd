

<template>
    <div class = "overflow-x-auto">
        <div class = 'bg-orange-100 rounded-lg px-2 my-3 py-2 mx-auto md:w-6/12 min-w-[60rem]' id="WholeTable">
            <p class = "text-right py-2 mx-3" v-show = "show_credit">
                目前學分: {{credit}}
            </p>
            <div class="relative inset-0">
                <div v-if="TimeMode" class="absolute w-full h-full left-0 top-0 z-20 bg-opacity-0 flex" @contextmenu.prevent="showsearchclass">
                    <div class = "w-[10px]">
                        ⠀
                    </div>
                    <div class = 'table-head w-36'>
                        
                    </div>   
                    <div class = 'virtualtable'>
                        <div class="virtualtablehead"></div>
                        <drag-select v-model="selection" background="rgba(254, 255, 166, 0.1)" >
                            <drag-select-option v-for="item in selectClassTable[0]" style="height: 50px" :value="item.val" :key="item.id" >
                                {{}}
                            </drag-select-option>
                        </drag-select>
                    </div>
                    <div class = 'virtualtable'>
                        <div class="virtualtablehead"></div>
                        <drag-select v-model="selection" background="rgba(254, 255, 166, 0.1)" >
                            <drag-select-option v-for="item in selectClassTable[1]" style="height: 50px" :value="item.val" :key="item.id" >
                                {{}}
                            </drag-select-option>
                        </drag-select>
                    </div>
                    <div class = 'virtualtable'>
                        <div class="virtualtablehead"></div>
                        <drag-select v-model="selection" background="rgba(254, 255, 166, 0.1)" >
                            <drag-select-option v-for="item in selectClassTable[2]" style="height: 50px" :value="item.val" :key="item.id" >
                                {{}}
                            </drag-select-option>
                        </drag-select>
                    </div>
                    <div class = 'virtualtable'>
                        <div class="virtualtablehead"></div>
                        <drag-select v-model="selection" background="rgba(254, 255, 166, 0.1)" >
                            <drag-select-option v-for="item in selectClassTable[3]" style="height: 50px" :value="item.val" :key="item.id" >
                                {{}}
                            </drag-select-option>
                        </drag-select>
                    </div>
                    <div class = 'virtualtable'>
                        <div class="virtualtablehead"></div>
                        <drag-select v-model="selection" background="rgba(254, 255, 166, 0.1)" >
                            <drag-select-option v-for="item in selectClassTable[4]" style="height: 50px" :value="item.val" :key="item.id" >
                                {{}}
                            </drag-select-option>
                        </drag-select>
                    </div>
                    <div class = 'virtualtable'>
                        <div class="virtualtablehead"></div>
                        <drag-select v-model="selection" background="rgba(254, 255, 166, 0.1)" >
                            <drag-select-option v-for="item in selectClassTable[5]" style="height: 50px" :value="item.val" :key="item.id" >
                                {{}}
                            </drag-select-option>
                        </drag-select>
                    </div>
                </div>
                <div class="z-10">
                    <table class = 'bg-orange-100 w-full' id = "class_table">
                        <thead>
                            <tr>
                                <th class = "w-[10px] m-1">
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
                            <tr v-for = "row in course_data" :key="row.id">
                                <courseCard v-for="item in row" :key="item.id" :item="item" />
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
import renderImage from "@functions/image_render.ts"
import { courseAdd, searchAdd } from "@functions/course_add.ts"
import { searchCourse, recordcourse, searchCourseByTime } from '@functions/course_search.ts';
import { splittime } from '@functions/tool.ts';
import { courseDelete, decreaseCredit } from '@functions/course_delete.ts';



import { Splitpanes, Pane } from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
import { useStore } from 'vuex';

const selection = ref([]);

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
let show = ref(1);
let data = ref([]);
let show_search_box = ref(true);
let selectClassTable = ref([]);

let TimeMode = computed(() => store.state.course.timeSearchMode);


let inputValue = searchInput.value.trim();
let single_row_data = ref([])

watch(searchInput, async (inputValue) => {
    show_search_box.value = true;
    if(inputValue != "")
    {   
        
        isLoading.value = true;
        show_search_box.value = true;
        // console.log(show_search_box.value)
        data.value = await searchCourse(inputValue);
        isLoading.value = false;
    }
    else
    {
        isLoading.value = false;
        show_search_box.value = false;
    }
});


// 測試右鍵監聽
async function showsearchclass(event) {
    // console.log('监听右键点击');
    try {
        // 使用 let 或 const 来声明局部变量
        store.dispatch('setSearchTimeTable', true);
        // console.log(selection.value[0]['0'] + 1, selection.value[0]['1'], selection.value.slice(-1)[0]['1']);
        store.dispatch('settimeSearchArgument', [selection.value[0]['0'] + 1, selection.value[0]['1'], selection.value.slice(-1)[0]['1']]);
        selection.value = [];
    } catch (error) {
        console.error('异步操作出错:', error);
    }
}



onMounted(() =>
{   
    store.dispatch("initAll")
    // using env to control <ul> display
    let ul = document.getElementById("result");
    if(ul != null)
    {
        // ul's max-height is 2rem x env.VITE_UL_ROW
        ul.style.maxHeight = (2 * env.VITE_UL_ROW).toString() + "rem";
    }
    for (let index = 0; index <= 5; index++){
        let temp = []
        for(let j = 0; j < 30; j++){
            temp.push({id : j, val:[index, j]});
        }
        selectClassTable.value.push(temp);
    }
})

var delete_course = function(item)
{
    // 刪除課程
    // console.log(item);
    if(item.getCredit() != null){
        // console.log(credit.value);
        decreaseCredit(item.getCredit())
        // credit.value -= item.getCredit();
        // console.log(credit.value);
    }
    // 再刪除函式裡面去更改store狀態
    courseDelete(item);
    // _2data_to_1d();
}

var show_popover = function() {
    // 顯示 popover
    let popover = document.getElementById("popover");
    popover.classList.remove("hidden");
    popover.classList.add("block");
}

var show_list = function() {
    // 顯示課程列表
    // _2data_to_1d();
    class_list_visible.value = !class_list_visible.value
}

function Sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}


async function refresh_table(){
    return new Promise(async (resolve, reject) => {
        show.value = !show.value;
        await Sleep(20);
        show.value = !show.value;
        resolve();
    });
}

const state = reactive({
    checked: false
})

</script>