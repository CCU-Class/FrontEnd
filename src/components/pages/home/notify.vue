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
          class="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden flex flex-col max-h-[90vh]"
        >
          <div class="bg-orange-50 px-6 py-4 border-b border-orange-100 flex justify-between items-center">
            <h2 class="text-xl font-bold text-orange-600 tracking-wide">
              系統公告
            </h2>
            <button 
              @click="closeModal" 
              class="text-gray-400 hover:text-gray-600 transition"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div class="p-6 overflow-y-auto custom-scrollbar">
            <div 
              v-if="!modify" 
              class="text-gray-600 leading-relaxed space-y-2 text-justify"
              v-html="content"
            ></div>

            <div v-else class="w-full">
              <label class="block text-sm font-bold text-gray-700 mb-2">編輯公告內容 (支援 HTML)</label>
              <textarea
                v-model="content"
                class="w-full h-64 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-300 focus:border-orange-300 outline-none transition resize-none text-sm"
              ></textarea>
            </div>
          </div>

          <div class="px-6 py-4 bg-gray-50 flex justify-end">
            <button
              @click="closeModal"
              class="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-medium py-2 px-6 rounded-full shadow-md transform active:scale-95 transition duration-200"
            >
              我知道了
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Token from "@functions/token";

const showModal = ref(false); // 預設關閉，由 onMounted 決定是否開啟
const modify = ref(false);

const content = ref(`
除了之前新增的 <span class="text-orange-600 font-bold border-b border-orange-300">時間課程搜尋</span> 和 <span class="text-orange-600 font-bold border-b border-orange-300">教師名稱系所搜尋</span> 功能，<br/><br/>
現在我們可以檢視 <span class="text-orange-600 font-bold text-lg">近幾學期的歷史課程了!</span> <br/>
另外，也新增多組課表功能，用來做不同組合的編排。<br/><br/>
如發生顯示問題可以嘗試重新整理頁面或清空課表重建，也可以回報發生問題的選課組合，我們會盡快修復!<br/><br/>
<div class="bg-orange-100 p-3 rounded-lg text-sm text-orange-800">
  <strong>手機版使用者請注意：</strong><br/>
  為了實現更多功能，目前手機版的網頁版面不太完善，建議使用電腦版瀏覽器以獲得更好的體驗。
</div>
`);

// 關閉 Modal 並記錄到 LocalStorage
const closeModal = () => {
  showModal.value = false;
  localStorage.setItem("hasReadAnnouncement_v1", "true");
};

onMounted(() => {
  // 檢查 Token (管理員權限)
  if (localStorage.getItem("token")) {
    const res = Token.verifyToken(localStorage.getItem("token"));
    if (res) {
      modify.value = true;
      console.log("Token verified: Edit mode");
    }
  }

  if (localStorage.getItem("notify") === null) {
    showModal.value = true;
    localStorage.setItem("notify", "true");
  } else {
    showModal.value = true; 
  }
});
</script>

<style scoped>
/* Vue Transition 動畫效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Modal 彈出時的縮放效果 (選用，若要更精緻可以加) */
.fade-enter-active .relative,
.fade-leave-active .relative {
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.fade-enter-from .relative,
.fade-leave-to .relative {
  transform: scale(0.95);
  opacity: 0;
}

/* 自定義捲軸樣式 (讓 Modal 內部捲軸好看一點) */
.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}
.custom-scrollbar::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>