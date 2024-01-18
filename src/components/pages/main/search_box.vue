<template>
    <Vue3DraggableResizable :draggable="false" :resizable="false" @dragging="handle_drag" @drag-end="drag_end" 
    id = "drag">
        <div class="w-full top-8 h-8 flex sticky z-10">
            <div class="mr-1 ml-auto w-8 text-lg relative small transition-all ease-in-out duration-500" 
            :class="{ 'large mr-2 border': !show}" @transitionend="transitionComplete" >
                <div v-if="show" @click="search_button">
                    <SearchOutlined class="absolute left-0 top-0 text-orange-400 text-3xl" v-if="show_icon"/>
                </div>
                <div class = "block large border ml-auto mr-2" v-if="!show">
                    <div class="m-2">
                        <div class = "flex w-full">
                            <div class = "text-black font-bold text-xl">
                                課程搜尋
                            </div>
                            <CloseCircleOutlined class="ml-auto" @click="search_button"/>
                        </div>
                        <input class = 'w-full mx-auto py-1 px-3 text-center course_search rounded-lg' type = "search" placeholder = "在此搜尋課程"  v-model = "searchInput">
                        <ul class = "mx-auto w-full result-show overflow-hidden overflow-y-auto overflow-x-hidden search_list" style="max-height: 10rem;" id = "result" v-show = "show_search">
                             <loadingSpinner v-if="isLoading" style="height: auto;"></loadingSpinner> 
                             <li v-else v-for = "item in data" class = "w-full bg-white/70 px-1 py-1 hover:bg-orange-300 hover:text-white cursor-pointer border-2" style="font-size: smaller;" @click="selectCourse(item)">
                                {{item.class_name}} 
                                {{item.teacher}} 
                            </li> 
                        </ul>
                        <div v-show="show_content">
                            <div class="bg-green-100/60 w-full h-40 border-green-200 py-5 px-3 border-2 font-mono">
                                <!-- 使用到selectedCourse -->
                                <div v-if="!selectedNull" class="text-sm">
                                    <p>課程ID: {{selectedCourse.id}}</p>
                                    <p>課程名稱: {{selectedCourse.class_name}}</p>
                                    <p>教師: {{selectedCourse.teacher}}</p>
                                    <p>學分: {{selectedCourse.credit}}</p>
                                    <p>教室: {{selectedCourse.class_room}}</p>
                                    <p>時間: {{selectedCourse.class_time}}</p>
                                </div>
                                
                            </div>
                            <div class="flex w-full h-8 p-2">
                                <div class="m-auto text-base rounded-2xl bg-green-200 px-3 py-1 hover:bg-green-300" @click="show_comment(selectedCourse.id)">查看評價</div>
                                <div class="m-auto text-base rounded-2xl bg-green-200 px-3 py-1 hover:bg-green-300" @click="push_to_table(2, selectedCourse)">加入課表</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Vue3DraggableResizable>
</template>

<script setup>
import { onMounted, onUpdated, ref, watch, reactive, computed } from 'vue';
import { useStore } from "vuex";
import {searchCourse, recordcourse} from "@functions/course_search.ts";
import {Course} from "@functions/general.ts";
import {v4 as uuidv4} from 'uuid';
import {splittime} from "@functions/tool.ts";
import {searchAdd, push_to_table} from "@functions/course_add";
import { show_comment } from '@functions/ccuplus';

const env = import.meta.env;
const store = useStore();
const show = ref(true);
const show_icon = ref(true);
const transitionCount = ref(0);
let can_open = true;

const searchInput = ref('');
const isLoading = ref(false);
const isInputEmpty = ref(true);
let inputValue = searchInput.value.trim();
let data = ref([]);
const noData = computed(() => data.value.length==0);

let selectedCourse = ref(null);
const selectedNull =  ref(true);

let show_search = ref(false)
let show_content = ref(true)

let opened = computed(() => store.state.course.timeSearchMode);

const search_button = () => {
    if(!can_open) return;
    show.value = !show.value;
    if(show.value == true){
        setTimeout(() => {
            show_icon.value = !show_icon.value;
            selectedNull.value = true;
            selectedCourse.value = null;
            searchInput.value = '';
            show_content.value = !show_content.value;
        }, 200);
    }else{
        show_icon.value = !show_icon.value;
        show_content.value = !show_content.value;
    }
};

function Sleep(time) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, time);
    });
}


watch(searchInput, async (inputValue) => {
    if(inputValue != "")
    {   
        isInputEmpty.value = false;
        isLoading.value = true;
        show_search.value = true;
        show_content.value = false;
        data.value = await searchCourse(inputValue);
        isLoading.value = false;
    }
    else
    {
        isInputEmpty.value = true;
        show_search.value = false;
        show_content.value = false;
        isLoading.value = false;
    }
});


const selectCourse = (course)=>{
    
    selectedCourse.value = course;
    show_content.value = true;
    show_search.value = false;
    // console.log(selectedCourse.value);
}

watch(selectedCourse, async ()=>{
    selectedNull.value = (selectedCourse.value == null);
});

const handle_drag = (event) => {
    can_open = false;    
};
const drag_end = () => {
    setTimeout(() => {
        can_open = true;
    }, 100);
};

// 被滑到看不見才會顯示小框框
function checkVisibility()
{
    const triggerElement = document.querySelector('.input');
    const hiddenElement = document.querySelector('#drag');
    const triggerRect = triggerElement.getBoundingClientRect();
    if(triggerRect.bottom <= 0 && !opened.value)
        hiddenElement.style.display = 'block';
    else
        hiddenElement.style.display = 'none';
}

onMounted(() => {
    setTimeout(() => {
        checkVisibility();
    }, 1000);
});
// Listen for scroll events and check visibility
window.addEventListener('scroll', checkVisibility);

</script>