<template>
    <div class = "flex flex-col w-full">
        <div class = 'w-2/12 mx-3 py-2 font-semibold min-w-[4rem] -order-1 text-green-500'>
            以系所年級進行搜尋
        </div>
        <div class="flex px-4">
            <div class="w-1/5 mx-2">
                <input class = 'w-11/12 mx-auto py-1 text-center course_search' type = "search" placeholder = "系所" v-model = "departmentInput">
                <ul class = "mx-auto w-11/12 result-show overflow-y-auto overflow-x-hidden" ref = "department_search_list" v-show="show_department">
                    <li v-for="item in department_data" class = "w-full bg-white/70 px-1 py-1 hover:bg-orange-300 hover:text-white" 
                    @click="departmentInput = item, departmentflag = false">
                        {{ item }}
                    </li>
                </ul>
            </div>
            <div class="w-1/5 mx-4">
                <input class = 'w-11/12 mx-auto py-1 text-center course_search' type = "search" placeholder = "年級" v-model = "searchInput">
            </div>
            <div class="w-full mx-2">
                <input class = 'w-11/12 mx-auto py-1 text-center course_search' type = "search" placeholder = "課程" v-model = "searchInput">
            </div>
        </div>
        
        <ul class = "mx-auto w-11/12 result-show overflow-y-auto overflow-x-hidden" ref="searchList" v-show="show_search_box">
            <loadingSpinner v-if="isLoading" style="height: auto;"></loadingSpinner>
            <li v-else v-for = "item in data" class = "w-full bg-white/70 px-1 py-1 hover:bg-orange-300 hover:text-white" @click="push_to_table(2, item), cleanInputArea()">
                [{{item.id}}] {{item.class_name}} {{item.teacher}} {{item.class_time}} {{item.class_room}} 
            </li>
        </ul>
    </div>
</template>

<script setup>
import { Course, InitTable, GetCourseTable } from '@functions/general';
import { getDepartment } from '@functions/course_search.ts';
import { push_to_table } from '@functions/course_add.ts';

import { onMounted, ref, watch } from 'vue';
import { useStore } from 'vuex';

const env = import.meta.env;

const store = useStore();
const setSearchTimeMode = (flag) => store.dispatch("setTimeSearchMode", flag);
const searchInput = ref('');
const isLoading = ref(false);
const isInputEmpty = ref(false);
const show_search_box = ref(false);
const data = ref([]);
const searchList = ref(null);
let departmentList = [];
const departmentInput = ref('');
const department_data = ref();
const show_department = ref(false);
let departmentflag = true;
const department_search_list = ref();

let cleanInputArea = function() {
    show_search_box.value = !show_search_box.value;
    searchInput.value = "";
}

watch(searchInput, async (inputValue) => {
    show_search_box.value = true;
    if(inputValue != "")
    {   
        isLoading.value = true;
        show_search_box.value = true;
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

function searchDepartment(inputValue)
{   
    let data = [];
    for(const name of departmentList)
    {   
        if(name.includes(inputValue))
        {
            data.push(name);
        }
    }
    console.log(data)
    return data;
}

watch(departmentInput, async (inputValue) => {
    if(inputValue != "" && departmentflag == true)
    {   
        show_department.value = true;
        department_data.value = searchDepartment(inputValue);
        if(searchList != null)
        {   
            // ul's max-height is 2rem x env.VITE_UL_ROW
            department_search_list.value.style.maxHeight = (2 * env.VITE_UL_ROW).toString() + "rem";
        }
    }
    else
    {
        show_department.value = false;
        departmentflag = true;
    }
});

onMounted(async () =>
{   
    if(searchList != null)
    {   
        // ul's max-height is 2rem x env.VITE_UL_ROW
        searchList.value.style.maxHeight = (2 * env.VITE_UL_ROW).toString() + "rem";
        department_search_list.value.style.maxHeight = (2 * env.VITE_UL_ROW).toString() + "rem";
    }
    departmentList= await getDepartment();
    console.log(departmentList);
    setSearchTimeMode(false);
})
</script>