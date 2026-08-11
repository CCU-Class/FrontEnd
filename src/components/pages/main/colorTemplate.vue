<template>
  <Teleport to="body">
    <div
      v-if="showColorPick"
      class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="修改課程顏色"
      @click.self="cancel">
      <div
        class="w-full max-w-sm rounded-2xl bg-white px-4 py-3 shadow-2xl">
        <ColorPicker
          :color="color"
          default-format="hex"
          class="mx-auto w-full"
          @color-change="updateColor" />
        <div class="flex w-full gap-3 py-5">
          <button
            type="button"
            class="w-1/2 rounded-2xl py-1 duration-200 hover:bg-gray-500 hover:text-white"
            @click="cancel">
            取消
          </button>
          <button
            type="button"
            class="w-1/2 rounded-2xl py-1 duration-200 hover:bg-gray-500 hover:text-white"
            @click="confirm">
            確認
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ColorPicker } from "vue-accessible-color-picker";
import { ref, computed, onUnmounted, watch } from "vue";
import store from "../../../store";
import {
  courseChangeColor,
  courseTextChangeColor,
} from "../../../functions/course_color.ts";

const color = ref(store.state.course.defaultColor);
const showColorPick = computed(
  () => store.state.course.show_ColorPick,
);
let previousBodyOverflow = "";

watch(showColorPick, (isOpen) => {
  if (isOpen) {
    color.value = store.state.course.defaultColor;
    previousBodyOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = previousBodyOverflow;
  }
});

onUnmounted(() => {
  if (showColorPick.value) {
    document.body.style.overflow = previousBodyOverflow;
  }
});

const course = computed(() => store.state.course.chooseCard);
const mode = computed(() => store.state.course.cardMode);
function updateColor(eventData) {
  color.value = eventData.cssColor;
}

function cancel() {
  store.dispatch("changeShowColorPick", false);
}

function confirm() {
  if (mode.value == 1) {
    courseChangeColor(course.value, color.value);
  } else if (mode.value == 2) {
    courseTextChangeColor(course.value, color.value);
  }
  store.dispatch("changeShowColorPick", false);
}
</script>
