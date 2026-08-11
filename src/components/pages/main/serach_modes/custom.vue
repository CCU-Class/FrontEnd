<template>
  <div class="w-2/12 mx-3 py-2 font-semibold -order-1 text-pink-500">
    自定義新增課程
  </div>
  <div
    class="flex flex-col md:flex-row mx-auto w-full gap-2 md:gap-0">
    <!-- 第一列：課程資訊 [課程名稱] [課程教室] -->
    <div class="flex flex-row w-full md:w-auto">
      <div class="mx-3 py-1 font-semibold min-w-[4rem]">課程資訊</div>

      <input
        class="mx-1 md:mx-2 flex-1 md:w-5/12 py-1 rounded-md text-center"
        type="text"
        placeholder="課程名稱"
        v-model="className" />

      <input
        class="mx-1 md:mx-2 flex-1 md:w-3/12 py-1 rounded-md text-center"
        type="text"
        placeholder="課程教室"
        v-model="classRoom" />
    </div>

    <!-- 第二列：星期、始堂、終堂、+ -->
    <div
      class="flex flex-row w-full md:w-auto justify-end md:justify-start">
      <select
        class="mx-1 py-1 rounded-md text-center flex-1 md:flex-none"
        v-model="weekDay">
        <option selected>星期</option>
        <option v-for="day in week" :value="day">
          {{ day }}
        </option>
      </select>

      <select
        class="mx-1 py-1 rounded-md text-center flex-1 md:flex-none"
        v-model="start">
        <option selected>始堂</option>
        <option v-for="cla in classes" :value="cla">
          {{ cla }}
        </option>
      </select>

      <select
        class="mx-1 py-1 rounded-md text-center flex-1 md:flex-none"
        v-model="end">
        <option selected>終堂</option>
        <option v-for="cla in classes" :value="cla">
          {{ cla }}
        </option>
      </select>

      <button
        class="btn-normal mx-1"
        v-on:click="
          push_to_table(1, {
            className: className,
            classRoom: classRoom,
            weekDay: weekDay,
            start: start,
            end: end,
          })
        ">
        +
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { push_to_table } from "@functions/course_add";

const week = ["一", "二", "三", "四", "五", "六"];
const classes = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
];
const className = ref();
const classRoom = ref();
const weekDay = ref("星期");
const start = ref("始堂");
const end = ref("終堂");
</script>
