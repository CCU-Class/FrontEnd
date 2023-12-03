<template>
    <div class="z-30 top-0 left-0 w-screen h-screen fixed flex items-center backdrop-blur-sm" v-show="status">
        <div class="h-4/6 w-full md:w-6/12 mx-auto bg-white px-3 py-2 rounded-lg drop-shadow-xl"> 
            <div class="px-6 py-6">
                <div class="flex justify-between border-b border-b-purple-400 pb-2 mb-2">
                    <div class="text-2xl font-bold text-purple-500">課程時間搜尋</div>
                    <CloseCircleOutlined class="text-2xl font-bold cursor-pointer text-purple-900" @click="close"/>
                </div>
                <!-- <div class = "flex flex-row text-md">
                    <p class = "font-bold"></p>
                    <p class = "mx-2"></p>
                </div> -->
                <div class="max-h-[28rem] overflow-x-hidden overflow-y-auto mt-6">
                    <div v-for="item in search_class_list_in_timemode" class="w-full bg-white/70 px-1 py-1 hover:bg-orange-300 hover:text-white cursor-pointer border-2" 
                    :class="{conflict: item.conflict}">
                        {{item.class_name}} {{item.teacher}} {{item.class_time}} 
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
import { searchCourseByTime } from '@functions/course_search.ts';
import { classconflict } from '@functions/course_add.ts';
const status = computed(() => store.state.course.searchTime_status);
const searchTimeArgument = computed(() => store.state.course.timeSearchArgument);
let search_class_list_in_timemode = ref([]);

watch(searchTimeArgument, async () => {
    console.log(searchTimeArgument.value);
    search_class_list_in_timemode.value = [];
    let data = await searchCourseByTime(searchTimeArgument.value[0], searchTimeArgument.value[1], searchTimeArgument.value[2]);
    console.log(data);
    search_class_list_in_timemode.value = [];
    for(let i = 0; i < data.length; i++){
        let temp = data[i];
        let conflict = classconflict(temp);
        temp['conflict'] = conflict;
        search_class_list_in_timemode.value.push(temp);
    }
})

const close = () => {
    store.dispatch('setSearchTimeTable', false);
}
</script>