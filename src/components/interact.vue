<template>
    <div class = "w-11/12 mx-auto my-6 px-3 py-3 bg-orange-100/60 rounded-lg md:w-9/12">
        <div class = 'text-xl font-semibold'>
            開始建置你的課表    
        </div>
        <div class = "my-2">
            <form class = 'flex py-1 mx-auto'>
                <div class = 'mx-3 py-1 font-semibold'>
                    課程資訊
                </div>
                <input class = 'mx-2 w-4/12 py-1 rounded-md text-center' type = "text" placeholder = "課程名稱" v-model = "className"/>
                <input class = 'mx-2 w-3/12 py-1 rounded-md text-center' type = "text" placeholder = "課程教室" v-model = "classRoom"/>
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
                <button class = 'btn-normal'>
                    新增課程
                </button>
            </form>
            <div class = 'mx-3 text-red-500'>
                
            </div>
            <hr class = 'mx-3 my-3 text-slate-300'>
            <div class = 'flex place-content-end'>
                <button class = 'btn-normal'>
                    展開課程列表
                </button>
                <button class = 'btn-normal'>
                    清空課表
                </button>
                <button class = 'btn-normal' v-on:click = "download()">
                    下載課表
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity"
const week = ["一", "二", "三", "四", "五", "六"]
const classes = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
const className = ref()
const classRoom = ref()
const weekDay = ref("星期")
const start = ref("始堂")
const end = ref("終堂")
var alert = ""

const download = () => {
    
}
</script>
