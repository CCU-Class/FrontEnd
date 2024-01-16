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
                    @click="departmentInput = item, departmentflag = false, clickDepartment()">
                        {{ item }}
                    </li>
                </ul>
            </div>
            <div class="w-1/5 mx-4">
                <select class = 'mx-1 py-1 rounded-md text-center' v-model = "gradeSelection">
                    <option v-for="(option, index) in gradeList" :key="index" :value="option.grade"> {{ option.grade }} </option>
                </select>
            </div>
            <div class="w-full mx-2">
                <ul class = "mx-auto w-11/12 result-show overflow-y-auto overflow-x-hidden" ref="searchList">
                    
                    <li v-for = "item in filteredClassList" class = "w-full bg-white/70 px-1 py-1 hover:bg-orange-300 hover:text-white" @click="push_to_table(2, item), cleanInputArea()">
                        [{{item.id}}] {{item.class_name}} {{item.teacher}} {{item.class_time}} {{item.class_room}} 
                    </li>
                </ul>
            </div>
        </div>
        
    </div>
</template>

<script setup>
import { Course, InitTable, GetCourseTable } from '@functions/general';
import { getDepartment, getGradeByDepartment, getCourseByDepartment } from '@functions/course_search.ts';
import { push_to_table } from '@functions/course_add.ts';

import { onMounted, ref, watch, computed } from 'vue';
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
const departmentflag = ref(true);
const department_search_list = ref();
const gradeList = ref();
const courseList = ref([]);
const gradeSelection = ref();

const filteredClassList = computed(() => {
    if(gradeSelection.value == 'all') return courseList.value;
    return courseList.value.filter(item => item.grade == gradeSelection.value);
});

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


watch(departmentInput, async (inputValue) => {
    if(inputValue != "" && departmentflag.value == true)
    {   
        show_department.value = true;
        department_data.value = departmentList.filter(name => name.includes(inputValue));
        if(searchList != null)
        {   
            // ul's max-height is 2rem x env.VITE_UL_ROW
            department_search_list.value.style.maxHeight = (2 * env.VITE_UL_ROW).toString() + "rem";
        }
    }
    else
    {
        show_department.value = false;
        departmentflag.value = true;
    }
});

watch(departmentflag, async (flag) => {
    console.log("48763", flag)
    if(!flag)
    {   
        
    }
});

async function clickDepartment()
{
    gradeList.value = [];
    gradeList.value = await getGradeByDepartment(departmentInput.value);
    gradeList.value.push({'grade': 'all'});
    gradeSelection.value = 'all';
    courseList.value = await getCourseByDepartment(departmentInput.value);
    console.log(courseList.value)
}

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