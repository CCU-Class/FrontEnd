<template>
  <div class="overflow-x-auto select-none">
    <div
      class="bg-orange-100 rounded-lg px-2 my-3 py-2 mx-auto md:w-6/12 min-w-[60rem]"
      id="WholeTable">
      <p class="text-right py-2 mx-3" v-show="show_credit">
        目前學分: {{ TotalCourseData[activeIndex].credit }}
      </p>
      <div class="relative inset-0">
        <div
          v-if="TimeMode"
          id="virtualtablediv"
          class="absolute w-full h-full left-0 top-0 z-20 bg-opacity-1 flex"
          @contextmenu.prevent="showsearchclass">
          <div class="w-[0.5rem]">
            <div class="h-10"></div>
            <div
              v-for="item in selectDisplay"
              class="h-[52px]"
              :class="{ selectDisplayColor: item.display }"></div>
          </div>
          <div class="table-head w-[8.5rem]"></div>

          <div class="virtualtable flex-1 w-0">
            <div class="virtualtablehead"></div>
            <drag-select
              v-model="selection"
              background="rgba(254, 255, 166, 0.1)">
              <drag-select-option
                v-for="item in selectClassTable[0]"
                style="height: 52px"
                :value="item.val"
                :key="item.id">
                {{}}
              </drag-select-option>
            </drag-select>
          </div>
          <div class="virtualtable flex-1 w-0">
            <div class="virtualtablehead"></div>
            <drag-select
              v-model="selection"
              background="rgba(254, 255, 166, 0.1)">
              <drag-select-option
                v-for="item in selectClassTable[1]"
                style="height: 52px"
                :value="item.val"
                :key="item.id">
                {{}}
              </drag-select-option>
            </drag-select>
          </div>
          <div class="virtualtable flex-1 w-0">
            <div class="virtualtablehead"></div>
            <drag-select
              v-model="selection"
              background="rgba(254, 255, 166, 0.1)">
              <drag-select-option
                v-for="item in selectClassTable[2]"
                style="height: 52px"
                :value="item.val"
                :key="item.id">
                {{}}
              </drag-select-option>
            </drag-select>
          </div>
          <div class="virtualtable flex-1 w-0">
            <div class="virtualtablehead"></div>
            <drag-select
              v-model="selection"
              background="rgba(254, 255, 166, 0.1)">
              <drag-select-option
                v-for="item in selectClassTable[3]"
                style="height: 52px"
                :value="item.val"
                :key="item.id">
                {{}}
              </drag-select-option>
            </drag-select>
          </div>
          <div class="virtualtable flex-1 w-0">
            <div class="virtualtablehead"></div>
            <drag-select
              v-model="selection"
              background="rgba(254, 255, 166, 0.1)">
              <drag-select-option
                v-for="item in selectClassTable[4]"
                style="height: 52px"
                :value="item.val"
                :key="item.id">
                {{}}
              </drag-select-option>
            </drag-select>
          </div>
          <div class="virtualtable flex-1 w-0">
            <div class="virtualtablehead"></div>
            <drag-select
              v-model="selection"
              background="rgba(254, 255, 166, 0.1)">
              <drag-select-option
                v-for="item in selectClassTable[5]"
                style="height: 52px"
                :value="item.val"
                :key="item.id">
                {{}}
              </drag-select-option>
            </drag-select>
          </div>
        </div>

        <div v-if="TimeMode" class="z-10 w-full flex">
          <table
            class="bg-orange-100 w-full border-separate"
            id="class_table">
            <thead>
              <tr>
                <th class="w-[0.5rem] m-1">⠀</th>
                <th class="table-head w-[8.5rem]" colspan="2">
                  節次
                </th>

                <th
                  v-for="weekday in week"
                  :key="weekday"
                  class="table-head">
                  星期{{ weekday }}
                </th>
              </tr>
            </thead>

            <tbody v-if="show">
              <tr
                v-for="row in TotalCourseData[activeIndex]
                  .classStorage"
                :key="row.id">
                <courseCard
                  v-for="item in row"
                  :key="item.id"
                  :item="item" />
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="w-full">
          <!-- Header -->
          <div
            class="grid border-b border-orange-300/50"
            style="
              grid-template-columns: 3.5rem repeat(6, minmax(0, 1fr));
            ">
            <div
              class="flex items-center justify-center py-2 text-xs font-semibold text-orange-900">
              時間
            </div>

            <div
              v-for="weekday in week"
              :key="weekday"
              class="flex items-center justify-center border-l border-orange-300/30 py-2 text-sm font-semibold text-orange-900">
              星期{{ weekday }}
            </div>
          </div>

          <!-- Timeline body -->
          <div
            class="grid"
            style="grid-template-columns: 3.5rem minmax(0, 1fr)">
            <!-- Time axis -->
            <aside
              class="relative border-r border-orange-300/40"
              :style="{
                height: `${timelineHeight}px`,
              }">
              <span
                v-for="hour in timelineHours"
                :key="hour"
                class="absolute inset-x-0 text-center text-[10px] leading-none text-orange-900/70"
                :style="{
                  top: `${minuteToTimelineOffset(hour * 60)}px`,
                  transform:
                    hour === 7
                      ? 'translateY(0)'
                      : hour === 22
                        ? 'translateY(-100%)'
                        : 'translateY(-50%)',
                }">
                {{ String(hour).padStart(2, "0") }}:00
              </span>
            </aside>

            <!-- Six weekday lanes -->
            <div class="grid grid-cols-6 min-w-0">
              <div
                v-for="weekday in week"
                :key="weekday"
                class="relative min-w-0 border-r border-orange-300/30 last:border-r-0"
                :style="{
                  height: `${timelineHeight}px`,
                }">
                <!-- Hour grid -->
                <div
                  v-for="hour in timelineHours"
                  :key="hour"
                  class="pointer-events-none absolute inset-x-0 border-t border-orange-300/25"
                  :style="{
                    top: `${minuteToTimelineOffset(hour * 60)}px`,
                  }"></div>

                <!-- Sessions -->
                <button
                  v-for="session in sessionsByDay[weekday]"
                  :key="session.key"
                  type="button"
                  class="absolute inset-x-0.5 z-10 cursor-pointer overflow-hidden rounded-md border border-white/70 px-1 py-0.5 text-center shadow-sm transition hover:brightness-95"
                  :style="sessionStyle(session)"
                  @click="openCourseDetails(session)">
                  <div
                    class="flex h-full min-w-0 flex-col items-center justify-center overflow-hidden">
                    <span class="w-full text-[10px] leading-tight">
                      {{ formatMinute(session.startMinute) }}
                      –
                      {{ formatMinute(session.endMinute) }}
                    </span>

                    <span
                      class="w-full break-words text-xs font-semibold leading-tight">
                      {{ session.course.getCourseName() }}
                    </span>

                    <span
                      class="w-full break-words text-[10px] leading-tight">
                      {{ session.course.getClassroom() }}
                    </span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Teleport to="body">
    <div
      v-if="selectedSession && selectedCourse"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="course-detail-title"
      @click.self="closeCourseDetails">
      <div
        class="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl">
        <!-- Header -->
        <header
          class="flex items-start justify-between border-b border-orange-100 bg-orange-50 px-5 py-4">
          <div>
            <p class="text-sm font-semibold text-orange-600">
              星期{{ selectedSession.weekday }}
              ·
              {{ selectedTimeLabel }}
            </p>

            <h2
              id="course-detail-title"
              class="mt-1 text-xl font-bold text-gray-900">
              {{ selectedCourse.getCourseName() }}
            </h2>
          </div>

          <button
            type="button"
            class="rounded-full px-3 py-1 text-xl text-gray-500 hover:bg-gray-100"
            aria-label="關閉課程資訊"
            @click="closeCourseDetails">
            ×
          </button>
        </header>

        <!-- Course detail -->
        <dl
          class="grid grid-cols-[5rem_1fr] gap-x-3 gap-y-3 px-5 py-5 text-sm">
          <dt class="text-gray-500">課程時間</dt>
          <dd>
            {{ selectedTimeLabel }}
          </dd>

          <dt class="text-gray-500">教室</dt>
          <dd>
            {{ selectedCourse.getClassroom() || "未提供" }}
          </dd>

          <dt class="text-gray-500">教師</dt>
          <dd>
            {{ selectedCourse.getTeacher() || "未提供" }}
          </dd>

          <dt class="text-gray-500">學分</dt>
          <dd>
            {{ selectedCourse.getCredit() ?? "未提供" }}
          </dd>

          <dt class="text-gray-500">系所</dt>
          <dd>
            {{ selectedCourse.getDepartment() || "未提供" }}
          </dd>

          <dt class="text-gray-500">年級</dt>
          <dd>
            {{ selectedCourse.getGrade() || "未提供" }}
          </dd>
        </dl>

        <!-- Existing course actions -->
        <footer
          class="grid grid-cols-2 gap-2 border-t border-gray-100 bg-gray-50 p-4">
          <button
            type="button"
            class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-100"
            @click="editSelectedCourse(1)">
            修改顏色
          </button>

          <button
            type="button"
            class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-100"
            @click="editSelectedCourse(2)">
            文字樣式
          </button>

          <button
            type="button"
            class="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm hover:bg-gray-100"
            @click="openSelectedCourseComment">
            查看評價
          </button>

          <button
            type="button"
            class="rounded-lg border border-red-200 bg-white px-3 py-2 text-sm text-red-700 hover:bg-red-50"
            @click="deleteSelectedCourse">
            刪除課程
          </button>
        </footer>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import {
  onMounted,
  onUpdated,
  ref,
  watch,
  reactive,
  computed,
} from "vue";
import { Switch } from "ant-design-vue";

import { rowspanize } from "@functions/rowspanizer";
import {
  Course,
  InitTable,
  GetCourseTable,
  WeekDayToInt,
} from "@functions/general";
import renderImage from "@functions/image_render.ts";
import {
  searchCourse,
  recordcourse,
  searchCourseByTime,
} from "@functions/course_search.ts";
import { splittime } from "@functions/tool.ts";
import {
  courseDelete,
  decreaseCredit,
} from "@functions/course_delete.ts";
import { show_comment } from "@functions/ccuplus";
import { Splitpanes, Pane } from "splitpanes";
import "splitpanes/dist/splitpanes.css";
import { useStore } from "vuex";

const selection = ref([]);

const store = useStore();
store.dispatch("initAll");
const status = computed(() => store.state.course.show);
const show_credit = computed(() => store.state.course.show_credit);
const open_credit = () => store.dispatch("show_credit");
const close_credit = () => store.dispatch("hidden_credit");
let TotalCourseData = computed(
  () => store.state.course.TotalCourseData,
);
const doubleCount = computed(() => count.value * 2);
let activeIndex = computed(() => store.state.course.activeIndex);
const hidden = () => {
  store.dispatch("hidden");
};

//component
import loadingSpinner from "@components/common/loadingSpinner.vue";
import courseCard from "@components/pages/main/courseCard.vue";

const env = import.meta.env;

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

const TIMELINE_START_MINUTE = 7 * 60;
const TIMELINE_END_MINUTE = 22 * 60;
const TIMELINE_SLOT_MINUTES = 30;
const TIMELINE_HOUR_HEIGHT = 64;

const className = ref();
const classRoom = ref();
const weekDay = ref("星期");
const start = ref("始堂");
const end = ref("終堂");
const searchInput = ref("");
const isLoading = ref(false);
const isInputEmpty = ref(false);
let class_list_title = ["課程名稱", "課程教室", "課程時間", "操作"];
let class_list_visible = ref(false);
let checked = ref(false);
let show = ref(1);
let data = ref([]);
let show_search_box = ref(true);
let selectClassTable = ref([]);
let selectDisplay = ref([]);

let TimeMode = computed(() => store.state.course.timeSearchMode);

const selectedSession = ref(null);

const selectedCourse = computed(
  () => selectedSession.value?.course ?? null,
);

const selectedTimeLabel = computed(() => {
  if (!selectedSession.value) {
    return "";
  }

  return `${formatMinute(
    selectedSession.value.startMinute,
  )} – ${formatMinute(selectedSession.value.endMinute)}`;
});

function openCourseDetails(session) {
  selectedSession.value = session;
}

function closeCourseDetails() {
  selectedSession.value = null;
}

function editSelectedCourse(mode) {
  const course = selectedSession.value?.course;

  if (!course) {
    return;
  }

  if (mode === 1) {
    store.dispatch("setDefaultColor", course.getColor());
  } else if (mode === 2) {
    store.dispatch("setDefaultColor", course.getTextColor());
  } else {
    return;
  }

  store.dispatch("setCardMode", mode);
  store.dispatch("setChooseCard", course);

  closeCourseDetails();

  store.dispatch("changeShowColorPick", true);
}

function deleteSelectedCourse() {
  const course = selectedSession.value?.course;

  if (!course) {
    return;
  }

  delete_course(course);
  closeCourseDetails();
}

function openSelectedCourseComment() {
  const course = selectedSession.value?.course;

  if (!course) {
    return;
  }
  const courseId = course.getId();

  if (!courseId) {
    return;
  }

  closeCourseDetails();

  show_comment(courseId);
}

let inputValue = searchInput.value.trim();
let single_row_data = ref([]);

watch(searchInput, async (inputValue) => {
  show_search_box.value = true;
  if (inputValue != "") {
    isLoading.value = true;
    show_search_box.value = true;
    data.value = await searchCourse(inputValue);
    isLoading.value = false;
  } else {
    isLoading.value = false;
    show_search_box.value = false;
  }
});

watch(selection, async () => {
  for (let i = 0; i < 30; i++) {
    selectDisplay.value[i].display = false;
  }
  for (let i = 0; i < selection.value.length; i++) {
    selectDisplay.value[selection.value[i]["1"]].display = true;
  }
});

async function showsearchclass(event) {
  try {
    store.dispatch("setSearchTimeTable", true);
    store.dispatch("settimeSearchArgument", [
      selection.value[0]["0"] + 1,
      selection.value[0]["1"],
      selection.value.slice(-1)[0]["1"],
    ]);
    selection.value = [];
  } catch (error) {
    console.error("Error in showsearchclass:", error);
  }
}

onMounted(() => {
  store.dispatch("initAll");
  let ul = document.getElementById("result");
  if (ul != null) {
    ul.style.maxHeight = (2 * env.VITE_UL_ROW).toString() + "rem";
  }
  for (let index = 0; index <= 5; index++) {
    let temp = [];
    for (let j = 0; j < 30; j++) {
      temp.push({ id: j, val: [index, j] });
    }
    selectClassTable.value.push(temp);
  }
  for (let i = 0; i < 30; i++) {
    selectDisplay.value.push({ display: false });
  }
});

var delete_course = function (item) {
  if (item.getCredit() != null) {
    decreaseCredit(item.getCredit());
  }
  courseDelete(item);
};

var show_popover = function () {
  let popover = document.getElementById("popover");
  popover.classList.remove("hidden");
  popover.classList.add("block");
};

var show_list = function () {
  class_list_visible.value = !class_list_visible.value;
};

function Sleep(time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, time);
  });
}

async function refresh_table() {
  return new Promise(async (resolve, reject) => {
    show.value = !show.value;
    await Sleep(20);
    show.value = !show.value;
    resolve();
  });
}

const state = reactive({
  checked: false,
});

// for "HH:mm" -> 430
function timeToMinute(time) {
  if (typeof time !== "string") return NaN;

  const [hour, minute] = time.split(":").map(Number);

  if (!Number.isFinite(hour) || !Number.isFinite(minute)) {
    return NaN;
  }

  return hour * 60 + minute;
}

// for 430 -> "HH:mm"
function formatMinute(minute) {
  const hour = Math.floor(minute / 60);
  const minutes = minute % 60;

  return `${String(hour).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0",
  )}`;
}

function minuteToTimelineOffset(minute) {
  return (
    ((minute - TIMELINE_START_MINUTE) * TIMELINE_HOUR_HEIGHT) / 60
  );
}

const timelineHeight = minuteToTimelineOffset(TIMELINE_END_MINUTE);

const timelineSessions = computed(() => {
  const matrix =
    TotalCourseData.value?.[activeIndex.value]?.classStorage;

  if (!Array.isArray(matrix)) {
    return [];
  }

  const sessions = [];

  for (let rowIndex = 0; rowIndex < matrix.length; rowIndex++) {
    for (const weekday of week) {
      const course = matrix[rowIndex]?.[WeekDayToInt[weekday]];

      if (!course?.getIsCourse()) {
        continue;
      }

      const length = course.getLength();

      // rowspanize() 已將連續區段的長度
      // 設定在該區段第一格。
      if (!length) {
        continue;
      }

      const startMinute = timeToMinute(course.getStartTime());

      if (!Number.isFinite(startMinute)) {
        continue;
      }

      const endMinute =
        TIMELINE_START_MINUTE +
        (rowIndex + length) * TIMELINE_SLOT_MINUTES;

      sessions.push({
        key: `${course.getUuid()}-${weekday}-${rowIndex}`,
        weekday,
        startMinute,
        endMinute,
        course,
      });
    }
  }

  return sessions;
});

const timelineHours = Array.from(
  {
    length: (TIMELINE_END_MINUTE - TIMELINE_START_MINUTE) / 60 + 1,
  },
  (_, index) => index + 7,
);

const sessionsByDay = computed(() => {
  const result = Object.fromEntries(
    week.map((weekday) => [weekday, []]),
  );

  for (const session of timelineSessions.value) {
    result[session.weekday].push(session);
  }

  return result;
});

function sessionStyle(session) {
  const top = minuteToTimelineOffset(session.startMinute);

  const bottom = minuteToTimelineOffset(session.endMinute);

  return {
    top: `${top}px`,
    height: `${bottom - top}px`,
    backgroundColor: session.course.getColor(),
    color: session.course.getTextColor(),
  };
}
</script>
