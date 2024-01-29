<template>
  <div class="flex flex-col w-full">
    <div
      class="w-2/12 mx-3 py-2 font-semibold min-w-[4rem] -order-1 text-red-500">
      以系所年級進行搜尋
    </div>
    <div class="">
      <div class="w-full flex justify-between">
        <div class="mx-12 w-4/12">
          <input
            class="w-full py-1 text-center"
            type="search"
            placeholder="系所"
            v-model="departmentInput" />
          <ul
            class="mx-auto result-show overflow-y-auto overflow-x-hidden z-10"
            ref="department_search_list"
            v-show="show_department">
            <li
              v-for="item in department_data"
              class="w-full bg-white/70 px-3 py-1 hover:bg-orange-300 hover:text-white"
              @click="
                (departmentInput = item),
                  (departmentflag = false),
                  clickDepartment()
              ">
              {{ item }}
            </li>
          </ul>
        </div>
        <div class="mx-12 w-4/12 inline-grid grid-cols-2">
          <div class="text-center leading-8">年級 / 向度</div>
          <select
            class="w-full h-8 text-center"
            v-model="gradeSelection">
            <option
              v-for="(option, index) in gradeList"
              :key="index"
              :value="option.grade">
              {{ option.grade }}
            </option>
          </select>
        </div>
      </div>
      <div class="w-full -z-40 mt-3">
        <ul
          class="mx-auto w-11/12 result-show overflow-y-auto overflow-x-hidden"
          ref="searchList"
          v-show="show_search_list">
          <li
            v-for="item in filteredClassList"
            class="w-full bg-white/70 px-6 py-1 hover:bg-orange-300 hover:text-white animate__animated"
            :class="{
              conflict: item.conflict,
              animate__rubberBand: item.click,
            }"
            :key="`${item.id}-${item.teacher}-${item.class_time}`"
            @click="classClick(item)">
            [{{ item.id }}] {{ item.class_name }} {{ item.teacher }}
            {{ item.class_time }} {{ item.class_room }}
          </li>
        </ul>
        <div class="mx-auto w-11/12 h-36" v-show="!show_search_list">
          <div
            class="w-full h-full flex justify-center items-center text-2xl bg-white text-slate-300">
            請選擇系所
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  Course,
  InitTable,
  GetCourseTable,
} from "@functions/general";
import {
  getDepartment,
  getGradeByDepartment,
  getCourseByDepartment,
} from "@functions/course_search.ts";
import {
  classconflict,
  push_to_table,
} from "@functions/course_add.ts";
import "animate.css";
import { onMounted, ref, watch, computed } from "vue";
import { useStore } from "vuex";

const env = import.meta.env;

const store = useStore();
const setSearchTimeMode = (flag) =>
  store.dispatch("setTimeSearchMode", flag);
const isLoading = ref(false);
const isInputEmpty = ref(false);
const show_search_list = ref(false);
const data = ref([]);
const searchList = ref(null);
let departmentList = [];
const departmentInput = ref("");
const department_data = ref();
const show_department = ref(false);
const departmentflag = ref(true);
const department_search_list = ref();
const gradeList = ref();
const courseList = ref([]);
const gradeSelection = ref();

const filteredClassList = computed(() => {
  if (departmentInput.value == "") return [];
  if (gradeSelection.value == "all") return courseList.value;
  return courseList.value.filter(
    (item) => item.grade == gradeSelection.value,
  );
});

const runConflictState = computed(
  () => store.state.course.runConflict,
);
const setConflictState = (state) =>
  store.dispatch("setrunConflictState", state);

const classClick = (item) => {
  if (push_to_table(2, item)) {
    setConflictState(1).then(() => {
      item.click = true;
    });
  }
};

watch(runConflictState, async (state) => {
  console.log(state);
  if (state == 1) {
    courseList.value = courseList.value.map((temp) => {
      temp["conflict"] = classconflict(temp);
      temp["click"] = false;
      return temp;
    });
    setConflictState(0);
  }
});

watch(departmentInput, async (inputValue) => {
  if (inputValue != "" && departmentflag.value == true) {
    show_department.value = true;
    department_data.value = departmentList.filter((name) =>
      name.includes(inputValue),
    );
  } else {
    show_department.value = false;
    show_search_list.value = false;
    departmentflag.value = true;
    gradeList.value = [];
  }
});

async function clickDepartment() {
  gradeList.value = [];
  getGradeByDepartment(departmentInput.value).then((data) => {
    if (data.length == 1) data = [];
    gradeList.value = data;
    gradeList.value.unshift({ grade: "all" });
    gradeSelection.value = "all";
  });
  let coursedata = await getCourseByDepartment(departmentInput.value);
  courseList.value = coursedata;
  // department 給 1
  setConflictState(1);
  show_search_list.value = true;
}

onMounted(async () => {
  if (searchList != null) {
    // ul's max-height is 2rem x env.VITE_UL_ROW
    searchList.value.style.maxHeight =
      (2 * env.VITE_UL_ROW).toString() + "rem";
    department_search_list.value.style.maxHeight =
      (2 * env.VITE_UL_ROW).toString() + "rem";
  }
  departmentList = await getDepartment();
  setSearchTimeMode(false);
});
</script>
