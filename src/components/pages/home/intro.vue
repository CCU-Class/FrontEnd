<template>
    <div class = "w-full mx-auto">
        <div>
            <div class = "w-full px-3 md:w-8/12 mx-auto pb-9">
                <div class = "py-6 text-center">
                    <router-link to = "/main" class = "btn-link">
                        > 開始使用 
                    </router-link>
                </div>
                <div class = 'text-orange-300 font-semibold text-3xl'>
                    初次見面?
                </div>
                <div class = 'text-xl text-gray-500 my-1'>
                    我們是現在就讀於中正大學的學生，為了改善中正學生的排課選課體驗而建立了中正課表團隊，<br>
                    希望能透過我們所學和自身經驗打造一個更加舒適且符合中正學生所需的服務。<br><br>
                    目前本網站提供之功能如下<br>
                    <ol class = 'list-decimal list-inside my-3'>
                        <li>
                            手動輸入或搜尋課程資訊 (可保存於同裝置之同一瀏覽器)
                        </li>
                        <li>
                            自動計算學分
                        </li>
                        <li>
                            產生對應之課表
                        </li>
                        <li>
                            課程格子背景顏色與文字顏色自定義
                        </li>
                        <li>
                            下載課表圖檔
                        </li>
                        <li>
                            課程評價查詢
                        </li>
                        <li>
                            時間搜尋課程
                        </li>
                        <li>
                            以教師名稱搜尋課程
                        </li>
                        <li>
                            以系所年級進行搜尋
                        </li>
                    </ol>
                </div>
            </div>
            <div class = 'w-11/12 md:w-7/12 mx-auto my-3'>
                <div class = 'text-center text-3xl font-bold border-b-2 mb-3 bg-gradient-to-br from-orange-300 to-red-700 text-transparent bg-clip-text'>
                    成員介紹
                </div>
                <!-- <vue-carousel :data="slides" class="bg-dark"></vue-carousel> -->
                <div class = "bg-orange-100/50 py-6 px-3 flex flex-row">
                    <div class = "w-[20rem] align-middle" v-lazy-container="{ selector: 'img' }">
                        <img data-src = '/member01.jpg' class = 'max-w-[15rem] mx-auto md:rounded-lg rounded-[100%]'>    
                    </div>
                    <div>
                        <p class = "text-2xl font-bold px-5 border-b border-white text-orange-700">
                            創辦人 吳翰平
                        </p>
                        <p class = "px-6 py-3 text-xl">
                            現在就讀於中正大學資訊工程學系三年級，
                            目前正在鑽研程式演算法競賽與網頁前後端工程，
                            負責本網站的前端工程，是一位 Vue 新手。
                        </p>
                    </div>
                </div>
                <div class = "bg-orange-100/50 py-6 px-3 flex flex-row">
                    <div class = "w-[20rem] align-middle" v-lazy-container="{ selector: 'img' }">
                        <img data-src = '/member02.jpg' class = 'max-w-[15rem] mx-auto md:rounded-lg rounded-[100%]'>    
                    </div>
                    <div>
                        <p class = "text-2xl font-bold px-5 border-b border-white text-orange-700">
                            王子銜
                        </p>
                        <p class = "px-6 py-3 text-xl">
                            中正大學通訊工程學系三年級，
                            主要研究網頁前後端與演算法競賽。
                            2023 中研院 Summer intern
                        </p>
                    </div>
                </div>
                <div class = "bg-orange-100/50 py-6 px-3 flex flex-row">
                    <div class = "w-[20rem] align-middle" v-lazy-container="{ selector: 'img' }">
                        <img data-src = '/member03.jpg' class = 'max-w-[15rem] mx-auto md:rounded-lg rounded-[100%]'>    
                    </div>
                    <div>
                        <p class = "text-2xl font-bold px-5 border-b border-white text-orange-700">
                            楊其龍
                        </p>
                        <p class = "px-6 py-3 text-xl">
                            中正大學資訊工程學系三年級
                            主要研究軟體工程、網頁前後端、競程，
                            目前主要學習ML，
                            此專案主要負責後端伺服器、資料庫、API。
                        </p>
                    </div>
                </div>
                <div class = "bg-orange-100/50 py-6 px-3 flex flex-row">
                    <div class = "w-[20rem] align-middle" v-lazy-container="{ selector: 'img' }">
                        <img data-src = '/member04.png' class = 'max-w-[15rem] mx-auto md:rounded-lg rounded-[100%]'>    
                    </div>
                    <div>
                        <p class = "text-2xl font-bold px-5 border-b border-white text-orange-700">
                            凃昀辰
                        </p>
                        <p class = "px-6 py-3 text-xl">
                            現在就讀於資訊工程學系三年級，
                            主要研究跨域資訊安全與CTF，
                            目前主要為學習ML相關知識。
                        </p>
                    </div>
                </div>
            </div>
            <div class = "w-full px-3 md:w-8/12 mx-auto py-9">
                <div class = 'text-center text-3xl font-bold border-b-2 mb-3 bg-gradient-to-br from-orange-300 to-red-700 text-transparent bg-clip-text'>
                    版本紀錄
                </div>
                <div class = 'text-xl text-gray-500 my-1'>
                    v 0.0.1 第一次公開測試版本開放 <br>
                    v 0.0.2 UI大規模重構與優化，準備加入搜尋功能 <br>
                    v 0.0.5 UI全面使用Tailwind改寫 <br>
                    v 0.0.6 加入搜尋功能，並使用MySQL當作資料庫 <br>
                    v 0.0.7 資料庫更改為postgreSQL <br>
                    v 0.0.8 增加計算學分之功能 <br>
                    v 1.0.0 使用 Vue + Typescript 來完全重構本網站，並新增數個新功能 <br>
                    v 1.0.1 與 ccu.plus 合作，新增查看 ccu.plus 評價功能<br>
                    v 1.0.2 更新課表合併方式，提供更穩定的課表渲染。<br>
                    v 1.0.3 新增時間搜尋、教師名稱搜尋功能。<br>
                    v 1.0.4 新增系所年級搜尋功能。<br>
                    v 1.0.5 課程列表可以顯示更多課程資訊，新增選擇課程時的衝堂顏色標示。<br>
                </div>
            </div>
            
            <div class = "w-full text-center px-3 md:w-8/12 mx-auto py-9">
                <div class = 'text-center text-3xl font-bold mb-3 bg-gradient-to-br from-orange-300 to-red-700 text-transparent bg-clip-text'>
                    聯絡我們
                </div>
                <div class = 'w-8/12 mx-auto my-2'>
                    <a href="mailto:pineappleschedule2023@gmail.com">團隊 email: pineappleschedule2023@gmail.com</a>
                </div>
            </div>
            <div class = "w-full text-center px-3 md:w-8/12 mx-auto pb-2">
                <div class = 'text-center text-3xl font-bold mb-3 bg-gradient-to-br from-orange-300 to-red-700 text-transparent bg-clip-text'>
                    相關連結
                </div>
                <div class = 'w-8/12 mx-auto my-5 py-5'>
                    <a class = 'btn-link' href = 'https://github.com/syzygy608/AhriSchedule' target = "_blank">Github原始碼</a>
                    <a class = 'btn-link' href = 'https://forms.gle/j9MKseJp9e89SAxJ6' target = "_blank">回饋表單</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();



const slides = [
    `<div class = "bg-orange-100/50 py-6 px-3 flex flex-row">
        <div class = "w-[20rem] align-middle">
            <img src = '/member01.jpg' class = 'max-w-[15rem] mx-auto md:rounded-lg rounded-[100%]'>    
        </div>
        <div>
            <p class = "text-2xl font-bold px-5 border-b border-white text-orange-700">
                創辦人 吳翰平
            </p>
            <p class = "px-6 py-3 text-xl">
                現在就讀於中正大學資訊工程學系三年級，
                目前正在鑽研程式演算法競賽與網頁前後端工程，
                負責本網站的前端工程，是一位 Vue 新手。
            </p>
        </div>
    </div>`,
    `<div class = "bg-orange-100/50 py-6 px-3 flex flex-row">
        <div class = "w-[20rem] align-middle">
            <img src = '/member02.jpg' class = 'max-w-[15rem] mx-auto md:rounded-lg rounded-[100%]'>    
        </div>
        <div>
            <p class = "text-2xl font-bold px-5 border-b border-white text-orange-700">
                王子銜
            </p>
            <p class = "px-6 py-3 text-xl">
                中正大學通訊工程學系三年級，
                主要研究網頁前後端與演算法競賽。
                2023 中研院 Summer intern
            </p>
        </div>
    </div>`,
    `<div class = "bg-orange-100/50 py-6 px-3 flex flex-row">
        <div class = "w-[20rem] align-middle">
            <img src = '/member03.jpg' class = 'max-w-[15rem] mx-auto md:rounded-lg rounded-[100%]'>    
        </div>
        <div>
            <p class = "text-2xl font-bold px-5 border-b border-white text-orange-700">
                楊其龍
            </p>
            <p class = "px-6 py-3 text-xl">
                中正大學資訊工程學系三年級
                主要研究軟體工程、網頁前後端、競程，
                目前主要學習ML，
                此專案主要負責後端伺服器、資料庫、API。
            </p>
        </div>
    </div>`,
    `<div class = "bg-orange-100/50 py-6 px-3 flex flex-row">
        <div class = "w-[20rem] align-middle">
            <img src = '/member04.png' class = 'max-w-[15rem] mx-auto md:rounded-lg rounded-[100%]'>    
        </div>
        <div>
            <p class = "text-2xl font-bold px-5 border-b border-white text-orange-700">
                凃昀辰
            </p>
            <p class = "px-6 py-3 text-xl">
                現在就讀於資訊工程學系三年級，
                主要研究跨域資訊安全與CTF，
                目前主要為學習ML相關知識。
            </p>
        </div>
    </div>`,
]

</script>

<style>
    .vue-carousel__indicator::before
    {
        background-color: black;
    }
</style>