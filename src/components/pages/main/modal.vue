<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="showModal"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          @click="closeModal"
        ></div>

        <div
          class="relative bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all"
        >
          <div class="bg-orange-50 px-6 py-4 border-b border-orange-100">
            <h2 class="text-xl font-bold text-orange-600 tracking-wide text-center">
              新增課表
            </h2>
          </div>

          <div class="p-6">
            <p class="text-gray-600 mb-4 text-center font-medium">
              請問您要建立全新的空白課表，<br />還是複製現有的課表內容？
            </p>

            <div class="relative">
              <select
                v-model="ret"
                class="w-full appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition cursor-pointer"
              >
                <option value="0">➕ 新增空白課表</option>
                <option disabled>──────────</option>
                <option
                  v-for="(tab, index) in tabs"
                  :key="index"
                  :value="index + 1"
                >
                  📄 複製：{{ tab.name }}
                </option>
              </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-6 py-4 flex justify-between items-center gap-4">
            <button
              class="flex-1 px-4 py-2 bg-white text-gray-500 border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 transition font-medium"
              @click="closeModal"
            >
              取消
            </button>
            <button
              class="flex-1 px-4 py-2 bg-gradient-to-r from-orange-400 to-orange-600 text-white rounded-lg shadow-md hover:from-orange-500 hover:to-orange-700 transform active:scale-95 transition font-medium"
              @click="SubmitModal"
            >
              確認新增
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, ref, watch } from "vue";
import { useStore } from "vuex"; // 建議明確引入 useStore

const store = useStore();

const showModal = computed(() => store.state.general.main_modal_show);
const tabs = computed(() => store.state.course.TotalCourseData);
const ret = ref("0");

// 監聽 Modal 開啟，每次開啟時重置選項為 "0" (預設選空白課表)
watch(showModal, (newVal) => {
  if (newVal) {
    ret.value = "0";
  }
});

const closeModal = () => {
  store.dispatch("close_main_modal");
};

const SubmitModal = () => {
  const copy = parseInt(ret.value);
  
  if (copy === 0) {
    // 新增空白課表
    store.dispatch("addTabs", null);
  } else if (copy >= 1 && copy <= tabs.value.length) {
    // 複製現有課表 (注意陣列索引是 copy - 1)
    store.dispatch("addTabs", tabs.value[copy - 1].id);
  } else {
    alert("輸入錯誤!");
    return;
  }
  
  closeModal();
};
</script>

<style scoped>
/* 淡入淡出動畫 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Modal 彈出縮放動畫 */
.fade-enter-active .transform,
.fade-leave-active .transform {
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-enter-from .transform,
.fade-leave-to .transform {
  opacity: 0;
  transform: scale(0.95);
}
</style>