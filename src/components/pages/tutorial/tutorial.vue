<template>
  <div class="w-full bg-gradient-to-b from-orange-50 to-white py-16 border-b border-orange-100">
    <div class="max-w-4xl mx-auto px-4 text-center">
      <h1 class="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
        <span class="bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
          CCU Class
        </span>
      </h1>
      <p class="text-xl text-gray-500 font-light max-w-2xl mx-auto">
        歡迎來到專屬於所有中正人的排課與課表製作網頁服務，<br>讓選課不再是難事。
      </p>
    </div>
  </div>

  <div class="max-w-6xl mx-auto py-12 px-4 md:px-8">
    
    <section class="mb-16">
      <div class="flex items-center mb-8">
        <div class="w-2 h-8 bg-orange-500 rounded-full mr-3"></div>
        <h2 class="text-3xl font-bold text-gray-800">排課功能</h2>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(item, index) in arrange" 
          :key="index"
          class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300 flex flex-col"
        >
          <div class="mb-3">
            <input
              v-if="modify"
              v-model="item.title"
              class="w-full text-lg font-bold text-orange-600 border-b-2 border-orange-200 focus:border-orange-500 outline-none bg-transparent py-1"
              placeholder="輸入標題"
            />
            <h3 v-else class="text-xl font-bold text-orange-600">
              {{ item.title }}
            </h3>
          </div>

          <div class="flex-grow">
            <textarea
              v-if="modify"
              v-model="item.content"
              class="w-full h-32 text-base text-gray-600 border rounded-lg p-3 focus:ring-2 focus:ring-orange-200 outline-none resize-none bg-gray-50"
              placeholder="輸入內容說明"
            ></textarea>
            <p v-else class="text-gray-600 leading-relaxed text-justify">
              {{ item.content }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="flex items-center mb-8">
        <div class="w-2 h-8 bg-red-500 rounded-full mr-3"></div>
        <h2 class="text-3xl font-bold text-gray-800">課表製作</h2>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="(item, index) in make" 
          :key="index"
          class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300 flex flex-col"
        >
          <div class="mb-3">
            <input
              v-if="modify"
              v-model="item.title"
              class="w-full text-lg font-bold text-orange-600 border-b-2 border-orange-200 focus:border-orange-500 outline-none bg-transparent py-1"
              placeholder="輸入標題"
            />
            <h3 v-else class="text-xl font-bold text-orange-600">
              {{ item.title }}
            </h3>
          </div>

          <div class="flex-grow">
            <textarea
              v-if="modify"
              v-model="item.content"
              class="w-full h-32 text-base text-gray-600 border rounded-lg p-3 focus:ring-2 focus:ring-orange-200 outline-none resize-none bg-gray-50"
              placeholder="輸入內容說明"
            ></textarea>
            <p v-else class="text-gray-600 leading-relaxed text-justify">
              {{ item.content }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Token from "@functions/token";

const arrange = ref([
  {
    title: "課程名稱搜尋",
    content: "在搜尋欄中輸入課程名稱，即可搜尋到相關課程。",
  },
  {
    title: "系所搜尋",
    content: "在搜尋欄中輸入科系，會用科系搜尋相關課程，並且可以用年級、向度等方式進行篩選。",
  },
  {
    title: "以教師名稱搜尋課程",
    content: "在搜尋欄中輸入教師名稱，會用教師名稱搜尋相關課程。",
  },
  {
    title: "自定義課程新增",
    content: "自行輸入課程名稱，可以用來規劃社團或其他活動的時間。",
  },
  {
    title: "以時間搜尋課程",
    content: "為了讓大家更方便尋找空堂時間的課程，我們提供了以時間搜尋課程的功能。開啟模式後，直接在課表上拖拉選擇時間，右鍵確認後即可搜尋。",
  },
  {
    title: "浮動搜尋欄",
    content: "當使用者在下方課表區域時，左邊會有一個可以縮放的浮動搜尋欄，可以在此直接搜尋課程並加入課表，操作更流暢。",
  },
  {
    title: "課程評價查看",
    content: "本站與 CCU Plus 合作，提供課程評價功能。在課表點擊課程翻轉後，或在搜尋欄選擇課程前，皆可查看該課程的真實評價。",
  },
]);

const make = ref([
  {
    title: "課表儲存",
    content: "只要在同一裝置的同瀏覽器，您的所有課表資訊都會自動保存，下次開啟時直接載入，無須重複操作。",
  },
  {
    title: "課表分享",
    content: "點選分享課表會產生一個專屬網址，您可以將其分享給朋友。該網址僅供查看，他人無法修改您的課表內容。",
  },
  {
    title: "多課表製作",
    content: "為了方便安排多種選課方案（如 Plan A / Plan B），或紀錄朋友的課表，您可以在此新增多個課表並自由切換。",
  },
  {
    title: "課表美化",
    content: "點擊課表上的課程將其翻轉，在背面的功能表內可以自定義格子顏色與文字顏色，打造獨一無二的個人化課表。",
  },
  {
    title: "學分計算",
    content: "開啟「顯示學分」功能，系統會自動計算目前課表中的學分總數（不含自定義課程），幫助您掌握學分狀況。",
  },
]);

const modify = ref(false);

// Token 驗證邏輯
if (localStorage.getItem("token")) {
  const res = Token.verifyToken(localStorage.getItem("token"));
  if (res) {
    modify.value = true;
    console.log("Token verified: Edit mode enabled");
  } else {
    console.log("Token expired");
  }
}
</script>

<style scoped>
/* 讓卡片 hover 時稍微往上浮動的效果 */
.hover\:shadow-md:hover {
  transform: translateY(-2px);
}
</style>