<template>
    <div class = "overflow-x-auto">
        <div class = "w-full mx-auto my-6 px-4 py-4 bg-gray-100 rounded-lg shadow-lg md:w-9/12">
            <div class = 'text-xl font-semibold'>
                開始建置你的課表    
            </div>
            <div class = "my-2">
                <div class = 'flex py-1 mx-auto'>
                    <div class = 'mx-3 py-1 font-semibold min-w-[4rem]'>
                        課程搜尋
                    </div>
                    <input class = 'mx-2 w-10/12 py-1 rounded-md text-center' type = "text" placeholder = "在此搜尋課程" v-model="searchInput"/>
                </div>
                <div class = 'flex py-1 mx-auto'>
                    <div class = 'mx-3 py-1 font-semibold min-w-[4rem]'>
                        課程搜尋
                    </div>
                    <ul class="mx-2">
                        <li class="mx-2 w-10/12 py-1 rounded-md text-center" style="background-color: red;">1233213</li>
                    </ul>
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
                <div class = 'flex place-content-end'>
                    <input type = "checkbox" id = "checkbox" v-model = "checked">
                    <label for = "checkbox" class = "px-3 items-center flex">顯示學分</label>
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
                <div id = "class_list" v-if = "class_list_visible == true">
                    <p class = "text-right py-2 mx-3" v-show = "checked">
                        目前學分: {{credit}}
                    </p>
                    <table class = "w-full my-1 mb-1">
                        <thead>
                            <tr>
                                <th v-for = "title in class_list_title" class = "text-center py-2 px-2 border-collapse bg-gray-200">
                                    {{title}}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class = "overflow-x-auto">
        <div class = 'bg-orange-100 rounded-lg px-2 my-3 py-2 mx-auto shadow-lg md:w-9/12 min-w-[60rem]'>
            <p class = "text-right py-2 mx-3" v-show = "checked">
                目前學分: {{credit}}
            </p>
            <table class = 'border-separate w-full' id = "class_table">
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
                <tbody>
                    <tr v-for = "row in course_data">
                        <td v-for = "item in row" class = "text-center p-0 h-full overflow-auto" :class = "{ title: item.getIsTitle(), course: item.getIsCourse() }" style = "height: 50px;">
                            <div> {{ item.getStartTime() }} </div>
                            <div> {{ item.getCourseName() }} </div>
                            <div> {{ item.getClassroom() }} </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script setup>
import { onMounted, onUpdated, ref, watch } from 'vue';
import { Rowspanizer } from '../functions/rowspanizer';
import { Course, InitTable, GetCourseTable } from '../functions/general';
import renderImage from "../functions/image_render.ts"
import { courseAdd, searchAdd } from "../functions/course_add.ts"
import { searchCourse } from '../functions/course_search.ts';


const week = ["一", "二", "三", "四", "五", "六"]
const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const className = ref()
const classRoom = ref()
const weekDay = ref("星期")
const start = ref("始堂")
const end = ref("終堂")
const searchInput = ref('');
const isInputEmpty = ref(false);
let class_list_title = ["課程名稱", "課程教室", "課程時間", "操作"];
let class_list_visible = ref(false);
let checked = ref(false);
let credit = ref(0);

let course_data = ref(GetCourseTable())

let inputValue = searchInput.value.trim();

watch(searchInput, (inputValue) => {
    console.log(inputValue)
    searchCourse(inputValue)
});


onMounted(() =>
{
    const temp = new Rowspanizer({
        target: "#class_table",
        colspan_index: 0
    })
    temp.rowspanize()
})

var show_list = function() {
    class_list_visible.value = !class_list_visible.value
}

var push_to_table = function(type) {
    // 手動新增課程
    // courseAdd(className.value: string, classRoom.value: string, weekDay.value: string, start.value: string, end.value: string)
    if(type == 1)
    {
        // check if the input is valid
        if(className.value == "" || classRoom.value == "" || weekDay.value == "星期" || start.value == "始堂" || end.value == "終堂")
        {
            alert("請檢查輸入資料是否填寫完整");
            return;
        }

        let check = courseAdd(className.value, classRoom.value, weekDay.value, start.value, end.value);
        if(check)
        {
            /*
            course_data.value = GetCourseTable()
            const temp = new Rowspanizer({
                target: "#class_table",
                colspan_index: 0
            })
            temp.rowspanize()
            */
            // 這裡有 bug，但是我不知道為什麼，理論上應該要是上面那樣寫才對
            window.location.reload();
        }
        else
        {
            alert("新增課程失敗，請檢查輸入資料是否正確");
            return;
        }
    }
    else
    {
        // 從搜尋結果新增課程
        let data = []; // 這裡要填入搜尋結果的資料
        
        /*
            結構如下
            interface CourseData
            {
                start_time: string;
                end_time?: string;
                week_day?: string;
                course_name: string;
                classroom: string;
                is_title: boolean;
                is_course: boolean;
            }
        */
        let check = searchAdd(data);
        if(check)
        {
            window.location.reload();
        }
        else
        {
            alert("新增課程失敗，請檢查輸入資料是否正確");
            return;
        }
    }
    
}

var clearTable = function() {
    // 顯示確認視窗
    if(confirm("確定要清空課表嗎？"))
    {
        // 清空課表
        localStorage.clear();
        InitTable();
        window.location.reload();
    }
    else
    {
        return;
    }
}

var download = function() {
    renderImage("class_table") // finish 
}

</script>
