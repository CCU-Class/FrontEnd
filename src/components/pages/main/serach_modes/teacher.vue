<template>
  <div class="flex flex-col w-full">
    <div
      class="w-2/12 mx-3 py-2 font-semibold min-w-[4rem] -order-1 text-green-500">
      以教師名稱進行搜尋
    </div>
    <input
      class="w-11/12 mx-auto py-1 text-center course_search"
      type="search"
      placeholder="使用教師名稱進行課程搜尋"
      v-model="searchInput" />

    <ul
      class="mx-auto w-11/12 result-show overflow-y-auto overflow-x-hidden"
      ref="searchList"
      v-show="show_search_box">
      <loadingSpinner
        v-if="isLoading"
        style="height: auto"></loadingSpinner>
      <li
        v-else
        v-for="item in data"
        class="w-full bg-white/70 px-1 py-1 hover:bg-orange-300 hover:text-white"
        :key="`${item.id}-${item.teacher}-${item.class_time}`"
        :class="{ conflict: item.conflict }"
        @click="push_to_table(2, item), cleanInputArea()">
        [{{ item.id }}] {{ item.class_name }} {{ item.teacher }}
        {{ item.class_time }} {{ item.class_room }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import {
  Course,
  InitTable,
  GetCourseTable,
} from "@functions/general";
import {
  recordcourse,
  searchByTeacher,
} from "@functions/course_search.ts";
import { splittime } from "@functions/tool.ts";
import {
  classconflict,
  push_to_table,
} from "@functions/course_add.ts";

import {
  onMounted,
  onUpdated,
  ref,
  watch,
  reactive,
  computed,
} from "vue";
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

const env = import.meta.env;

const store = useStore();
const setSearchTimeMode = (flag) =>
  store.dispatch("setTimeSearchMode", flag);
const searchInput = ref("");
const isLoading = ref(false);
const isInputEmpty = ref(false);
const show_search_box = ref(false);
const data = ref([]);
const searchList = ref(null);

let cleanInputArea = function () {
  console.log(48763);
  show_search_box.value = !show_search_box.value;
  searchInput.value = "";
};
watch(searchInput, async (inputValue) => {
  show_search_box.value = true;
  if (inputValue != "") {
    isLoading.value = true;
    show_search_box.value = true;
    data.value = await searchByTeacher(inputValue);
    data.value = data.value.map((temp) => {
      temp["conflict"] = classconflict(temp);
      return temp;
    });
    isLoading.value = false;
    if (searchList != null) {
      // ul's max-height is 2rem x env.VITE_UL_ROW
      searchList.value.style.maxHeight =
        (2 * env.VITE_UL_ROW).toString() + "rem";
    }
  } else {
    isLoading.value = false;
    show_search_box.value = false;
  }
});

onMounted(() => {
  // remerge_table();
  // using env to control <ul> display
  if (searchList != null) {
    // ul's max-height is 2rem x env.VITE_UL_ROW
    searchList.value.style.maxHeight =
      (2 * env.VITE_UL_ROW).toString() + "rem";
  }
  setSearchTimeMode(false);
});
</script>
