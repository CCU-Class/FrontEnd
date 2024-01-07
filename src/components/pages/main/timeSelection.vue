<template>
    <div class="fixed z-30 top-0 left-0 h-screen flex items-center backdrop-blur-sm"  v-show="status" :style="{width: widthnum}">
        <div class="max-h-4/6 w-full md:w-6/12 mx-auto bg-white px-3 py-2 rounded-lg drop-shadow-xl"> 
            <div class="px-6 py-6">
                <div class="flex justify-between border-b border-b-orange-200 pb-2 mb-2">
                    <div class="text-2xl font-bold text-orange-300">課程時間搜尋</div>
                    <CloseCircleOutlined class="text-2xl font-bold cursor-pointer text-purple-900" @click="close"/>
                </div>
                <div class = "mx-1" v-if = "search_class_list_in_timemode.length && !isLoading">
                    <div class = "flex items-center" @click="toggleActive = !toggleActive">
                        <div class = "w-12 h-6 flex items-center bg-gray-300 rounded-full duration-300 ease-in-out" :class="{ 'bg-orange-300': toggleActive}">
                        <div class = "bg-white w-5 h-5 rounded-full shadow-md transform duration-300 ease-in-out" :class="{ 'translate-x-6': toggleActive}"></div>
                        </div>
                        <span class = 'mx-3 py-1 min-w-[4rem]'>
                            僅顯示通識課程
                        </span>
                    </div>
                </div>
                <div class="overflow-x-hidden mt-4 overflow-y-auto max-h-80" v-show="search_inform">
                    <loadingSpinner v-if="isLoading" style="height: auto;"></loadingSpinner> 
                    <div v-for="item in filteredClassList" class="w-full bg-white/70 px-1 py-1 hover:bg-orange-300 hover:text-white cursor-pointer border-2" 
                    :class="{conflict: item.conflict}" @click="show_inform(item)">
                        {{item.class_name}} {{item.teacher}} {{item.class_time}} 
                    </div>
                    <div v-if="!search_class_list_in_timemode.length && !isLoading" class="text-center">
                        此時段無課程
                    </div>
                </div>
                <div v-show="show_content_search_by_time" class="mt-4">
                    <div class="bg-green-100/60 w-full h-40 border-green-200 pd-5 py-3 px-3 border-2 font-mono mt-6 flex">
                        <!-- 使用到selectedCourse -->
                        <div class="text-sm w-full pt-2">
                            <p>課程ID: {{selectedCoursesearchtime.id}}</p>
                            <p>課程名稱: {{selectedCoursesearchtime.class_name}}</p>
                            <p>教師: {{selectedCoursesearchtime.teacher}}</p>
                            <p>學分: {{selectedCoursesearchtime.credit}}</p>
                            <p>教室: {{selectedCoursesearchtime.class_room}}</p>
                            <p>時間: {{selectedCoursesearchtime.class_time}}</p>
                        </div>
                        <CloseCircleOutlined class="text-gray-900" @click="close_inform"/>
                    </div>
                    <div class="flex w-full h-8 p-2">
                        <div v-if="!showComment" class="m-auto text-base rounded-2xl bg-green-200 px-3 py-1 hover:bg-green-300" @click="show_comment(selectedCoursesearchtime.id)">查看評價</div>
                        <div class="m-auto text-base rounded-2xl bg-green-200 px-3 py-1 hover:bg-green-300" @click="push_to_table(selectedCoursesearchtime)">加入課表</div>
                    </div>
                </div>
                <div class="flex justify-between">
                    
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed, watch, ref, onMounted } from 'vue'
import store from '../../../store';
import { searchCourseByTime, recordcourse } from '@functions/course_search.ts';
import { classconflict, searchAdd } from '@functions/course_add.ts';
import { splittime } from '@functions/tool.ts';
import {v4 as uuidv4} from 'uuid';
import {Course} from "@functions/general.ts";

const env = import.meta.env;
const status = computed(() => store.state.course.searchTime_status);
const showComment = computed(() => store.state.course.show);
const searchTimeArgument = computed(() => store.state.course.timeSearchArgument);
let search_class_list_in_timemode = ref([]);

const isLoading = ref(false);
const show_content_search_by_time = ref(false);
const search_inform = ref(true);
const selectedCoursesearchtime = ref({});
const out = ref();
const toggleActive = ref(false);

const filteredClassList = computed(() => {
  return toggleActive.value
    ? search_class_list_in_timemode.value.filter(item => item.department && item.department.includes('通識'))
    : search_class_list_in_timemode.value;
});

async function show_comment(courseid)
{
    window.scrollTo(0, 0);
    store.dispatch("pass_course_id", courseid);
    store.dispatch("display");
}

// 使用defineProps来访问prop
const width = defineProps(['message']);
const widthnum = ref();

watch(width, async() => {
    // console.log(width.message);
    widthnum.value = width.message + "px"
    // console.log(widthnum.value);
    // console.log(out.value.clientWidth);
    // out.value.width = width.message;
})

const show_inform = (course)=>{
    
    selectedCoursesearchtime.value = course;
    // console.log(selectedCoursesearchtime);
    show_content_search_by_time.value = true;
    search_inform.value = false;
    // console.log(selectedCourse.value);
}

watch(searchTimeArgument, async () => {
    // console.log(searchTimeArgument.value);
    search_class_list_in_timemode.value = [];
    isLoading.value = true;
    let data = await searchCourseByTime(searchTimeArgument.value[0], searchTimeArgument.value[1], searchTimeArgument.value[2]);
    search_class_list_in_timemode.value = [];
    for(let i = 0; i < data.length; i++){
        let temp = data[i];
        let conflict = classconflict(temp);
        temp['conflict'] = conflict;
        search_class_list_in_timemode.value.push(temp);
    }
    console.log(search_class_list_in_timemode.value)
    isLoading.value = false;
})

let push_to_table = async function (item){
    // 從搜尋結果新增課程
    recordcourse(item)
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
    // console.log(check)
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
    close();
}

const close = () => {
    store.dispatch('setSearchTimeTable', false);
    selectedCoursesearchtime.value = {};
    show_content_search_by_time.value = false;
    search_inform.value = true;
    store.dispatch("hidden")
    store.dispatch("purge");
}

const close_inform = () => {
    selectedCoursesearchtime.value = {};
    show_content_search_by_time.value = false;
    search_inform.value = true;
    store.dispatch("hidden")
    store.dispatch("purge");
}

</script>