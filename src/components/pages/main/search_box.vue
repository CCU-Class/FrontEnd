<template>
    <Vue3DraggableResizable :draggable="false" :resizable="false" @dragging="handle_drag" @drag-end="drag_end" 
    id = "drag">
        <div class="w-full top-8 h-8 flex sticky z-50">
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
                                <div class="m-auto text-base rounded-2xl bg-green-200 px-3 py-1 hover:bg-green-300" @click="push_to_table(selectedCourse)">加入課表</div>
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
import {searchCourse} from "@functions/course_search.ts";
import {Course} from "@functions/general.ts";
import {v4 as uuidv4} from 'uuid';
import {splittime} from "@functions/tool.ts";
import {searchAdd} from "@functions/course_add";

const env = import.meta.env;

const store = useStore();

async function show_comment(courseid)
{
    window.scrollTo(0, 0);
    store.dispatch("pass_course_id", courseid);
    store.dispatch("display");
}

const show = ref(false);
const show_icon = ref(false);
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
let show_content = ref(false)

const search_button = () => {
    if(!can_open) return;
    show.value = !show.value;
    if(show.value == true){
        setTimeout(() => {
            show_icon.value = !show_icon.value;
            // console.log("fuck you");
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

function remerge_table(){
    const temp = new Rowspanizer({
        target: "#class_table",
        colspan_index: 0
    })
    temp.rowspanize()
}

async function refresh_table(){
    return new Promise(async (resolve, reject) => {
        store.dispatch('setShowTable', false);
        await Sleep(100);
        store.dispatch('setShowTable', true);
        resolve();
    });
}

let push_to_table = async function (item){
    await refresh_table();
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
                uuid: Uuid
            }));
        }
        console.log(data);
        // 成功插入會回傳課程陣列，反之回傳false
        // 在做儲存
        let check = searchAdd(data);
        if(!check)
        {   
            alert("新增課程失敗，請檢查是否衝堂");
            window.location.reload();
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
        uuid: Uuid
    }));
    await refresh_table();
    store.dispatch('addCredit', Number(item.credit));
    // await Sleep(30);
    // // _2data_to_1d();
    // remerge_table();
    // await Sleep(10);
    // 先檔一下
    window.location.reload();
}

watch(searchInput, async (inputValue) => {
    let list = document.getElementById("result");
    if(inputValue != "")
    {   
        isInputEmpty.value = false;
        isLoading.value = true;
        show_search.value = true;
        data.value = await searchCourse(inputValue);
        isLoading.value = false;
    }
    else
    {
        isInputEmpty.value = true;
        show_search.value = false;
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

function checkVisibility()
{
    const triggerElement = document.querySelector('.input');
    const hiddenElement = document.querySelector('#drag');
    const triggerRect = triggerElement.getBoundingClientRect();
    if(triggerRect.bottom <= 0)
        hiddenElement.style.display = 'block';
    else
        hiddenElement.style.display = 'none';
}

onMounted(() => {
    checkVisibility();
});
// Listen for scroll events and check visibility
window.addEventListener('scroll', checkVisibility);

</script>

<style>
.small {
    position: relative;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.border{
    border-radius: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.large {
    width: 20rem;
    height: 28rem;
    background-color: white;
}
#drag
{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 50;
    display: none;
    transition: 0.5s;
}
.search_list::-webkit-scrollbar {
    /* bar color */
    background-color: transparent;
    width: 0.7rem;
}
.search_list::-webkit-scrollbar-thumb {
    background-color: #7e7e7e;
    border-radius: 14px;
    border: 3px solid #fff;
}
</style>
