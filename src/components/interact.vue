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
                    <input class = 'mx-2 w-10/12 py-1 rounded-md text-center' type = "text" placeholder = "在此搜尋課程"/>
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
                    <button class = 'btn-normal' v-on:click = "push_to_table">
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
</template>

<script setup>
import { ref } from "@vue/reactivity"
import renderImage from "../functions/image_render.ts"
import courseAdd from "../functions/course_add.ts"
const week = ["一", "二", "三", "四", "五", "六"]
const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const className = ref()
const classRoom = ref()
const weekDay = ref("星期")
const start = ref("始堂")
const end = ref("終堂")
let class_list_title = ["課程名稱", "課程教室", "課程時間", "操作"];
let class_list_visible = ref(false);
let checked = ref(false);
let credit = ref(0);

var show_list = function() {
    class_list_visible.value = !class_list_visible.value
}

var push_to_table = function() {
    // 手動新增課程
    // courseAdd(className.value: string, classRoom.value: string, weekDay.value: string, start.value: string, end.value: string)
    courseAdd(className.value, classRoom.value, weekDay.value, start.value, end.value)
}

var download = function() {
    renderImage("class_table") // finish 
}

</script>
