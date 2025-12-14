<template>
  <div class="w-full min-h-screen bg-gray-50/50">
    <div class="max-w-5xl mx-auto px-4 py-8">
      
      <section class="max-w-3xl mx-auto mb-12 text-center">
        <div class="py-6">
          <router-link 
            to="/main" 
            class="inline-block px-6 py-2 bg-orange-400 text-white rounded-full hover:bg-orange-600 transition duration-300 shadow-md">
            > 開始使用
          </router-link>
        </div>
        <h1 class="text-4xl font-bold text-orange-500 mb-4 tracking-wider">
          初次見面?
        </h1>
        <div class="text-lg text-gray-600 leading-relaxed">
          <p class="mb-4">
            我們是曾就讀於中正大學的學生，為了改善中正學生的排課選課體驗而建立了中正課表團隊，
            希望能透過我們所學和自身經驗打造一個更加舒適且符合中正學生所需的服務。
          </p>
          <div class="mt-6 text-left bg-white p-6 rounded-xl shadow-sm border border-orange-100">
            <h3 class="font-bold text-2xl text-gray-700 mb-2 border-l-4 border-orange-400 pl-2">目前功能</h3>
            <textarea
              v-if="modify"
              class="w-full h-48 bg-gray-50 border rounded p-3 text-gray-600 focus:outline-orange-300"
              v-model="feature">
            </textarea>
            <ol
              v-else
              class="list-decimal list-inside space-y-1 text-gray-600 ml-2"
              v-html="feature">
            </ol>
          </div>
        </div>
      </section>

      <section class="mb-16">
        <div class="text-center mb-8">
          <h2 class="inline-block text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-600 text-transparent bg-clip-text pb-2 border-b-2 border-orange-200">
            成員介紹
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div 
            v-for="(member, index) in members" 
            :key="index"
            class="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col md:flex-row items-center border border-orange-50"
          >
            <div class="flex-shrink-0 mb-4 md:mb-0 md:mr-6" v-lazy-container="{ selector: 'img' }">
              <div class="w-32 h-32 md:w-36 md:h-36 rounded-full overflow-hidden border-4 border-orange-100 shadow-inner mx-auto">
                <img
                  :data-src="member.img"
                  alt="Member Photo"
                  class="w-full h-full object-cover" 
                />
              </div>
            </div>
            
            <div class="flex-1 text-center md:text-left">
              <h3 class="text-xl font-bold text-orange-700 mb-2">
                {{ member.name }}
              </h3>
              
              <textarea
                v-if="modify"
                class="w-full h-32 p-2 text-sm bg-gray-50 border rounded focus:outline-none focus:border-orange-300"
                v-model="member.intro">
              </textarea>
              <p v-else class="text-gray-600 text-sm leading-relaxed text-justify">
                {{ member.intro }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section class="max-w-3xl mx-auto mb-16">
        <div class="text-center mb-6">
          <h2 class="inline-block text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-600 text-transparent bg-clip-text pb-2 border-b-2 border-orange-200">
            版本紀錄
          </h2>
        </div>
        <div class="bg-white rounded-xl shadow-sm p-6 border border-orange-100">
          <div v-if="!modify" v-html="version" class="text-gray-600 leading-7"></div>
          <textarea
            v-else
            class="w-full h-64 bg-gray-50 border rounded p-3 text-gray-600 focus:outline-orange-300"
            v-model="version">
          </textarea>
        </div>
      </section>

      <section class="text-center space-y-8">
        <div>
          <h2 class="text-2xl font-bold text-gray-700 mb-4">聯絡我們</h2>
          <a 
            href="mailto:pineappleschedule2023@gmail.com"
            class="text-orange-600 hover:text-orange-800 hover:underline text-lg transition"
          >
            pineappleschedule2023@gmail.com
          </a>
        </div>

        <div class="border-t border-gray-200 pt-8 w-full md:w-8/12 mx-auto">
          <h2 class="text-xl font-bold text-gray-700 mb-6">相關連結</h2>
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <a
              class="px-6 py-2 border-2 border-gray-300 text-gray-600 rounded-lg hover:border-orange-500 hover:text-orange-500 transition font-medium"
              href="https://github.com/syzygy608/AhriSchedule"
              target="_blank">
              <i class="fab fa-github mr-2"></i>Github 原始碼
            </a>
            <a
              class="px-6 py-2 border-2 border-gray-300 text-gray-600 rounded-lg hover:border-orange-500 hover:text-orange-500 transition font-medium"
              href="https://forms.gle/j9MKseJp9e89SAxJ6"
              target="_blank">
              回饋表單
            </a>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import Token from "@functions/token";

const router = useRouter();
const modify = ref(false);

// 驗證 Token 邏輯
if (localStorage.getItem("token")) {
  const res = Token.verifyToken(localStorage.getItem("token"));
  if (res) {
    modify.value = true;
    console.log("Token verified: Edit mode enabled");
  } else {
    console.log("Token expired");
  }
}

// 資料區
const feature = ref(`
  <li>手動輸入或搜尋課程資訊 (可保存於同裝置之同一瀏覽器)</li>
  <li>自動計算學分</li>
  <li>產生對應之課表</li>
  <li>課程格子背景顏色與文字顏色自定義</li>
  <li>下載課表圖檔</li>
  <li>課程評價查詢</li>
  <li>時間搜尋課程</li>
  <li>以教師名稱搜尋課程</li>
  <li>以系所年級進行搜尋</li>
  <li>歷年課程查詢</li>
  <li>建立多組課表</li>
  <li>課表分享功能</li>
`);

// 將圖片路徑整合進陣列，方便 v-for 渲染
const members = ref([
  {
    name: "吳翰平",
    img: "/member01.jpg",
    intro: "曾讀於中正大學資訊工程學系，目前為成功大學資訊工程研究所學生，負責本網站的前端工程，是一位 Vue 新手。",
  },
  {
    name: "王子銜",
    img: "/member02.jpg",
    intro: "中正大學通訊工程學系四年級，主要研究網頁前後端與演算法競賽。 2023 中研院 Summer intern",
  },
  {
    name: "楊其龍",
    img: "/member03.jpg",
    intro: "中正大學資訊工程學系四年級 主要研究軟體工程、網頁前後端、競程， 目前主要學習ML， 此專案主要負責後端伺服器、資料庫、API。",
  },
  {
    name: "凃昀辰",
    img: "/member04.png",
    intro: "現在就讀於資訊工程學系四年級，主要研究跨域資訊安全與CTF， 目前主要為學習ML相關知識。",
  },
]);

const version = ref(`
<ul class="list-disc pl-5 space-y-2">
  <li><strong>v 0.0.1</strong> 第一次公開測試版本開放</li>
  <li><strong>v 0.0.2</strong> UI大規模重構與優化，準備加入搜尋功能</li>
  <li><strong>v 0.0.5</strong> UI全面使用Tailwind改寫</li>
  <li><strong>v 0.0.6</strong> 加入搜尋功能，並使用MySQL當作資料庫</li>
  <li><strong>v 1.0.0</strong> 使用 Vue + Typescript 完全重構本網站</li>
  <li><strong>v 1.0.1</strong> 新增 ccu.plus 評價功能</li>
  <li><strong>v 1.0.3</strong> 新增時間搜尋、教師名稱搜尋功能</li>
  <li><strong>v 1.0.6</strong> 新增歷年課程查詢、多組課表、分享功能</li>
  <li><strong>v 1.1.0</strong> 因應中正大學新選課系統上線，微調架構並修正寬螢幕 BUG</li>
</ul>
`);
</script>

<style scoped>
/* 如果有需要額外的 CSS 可以寫在這，但大部分已使用 Tailwind 處理 */
</style>