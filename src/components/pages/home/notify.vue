<template>
    <div class = "z-10 top-0 left-0 w-screen h-screen fixed flex items-center backdrop-blur-sm" v-show = "showModal">
        <div id = "modal-container" class = "fixed inset-0 flex justify-center h-full md:h-6/12 w-full md:w-7/12 mx-auto" v-show="showModal">
            <div class = "bg-white p-8 rounded-3xl shadow-lg my-auto">
                <h2 class = "text-xl font-semibold mb-4 text-center"> 提醒 </h2>
                <hr class = "py-2">
                <p class = "mb-4">
                    除了之前新增的 <font class = "border-b border-double font-bold">時間課程搜尋和教師名稱搜尋</font> 功能，<br>
                    現在也可以透過 <font class = "border-b border-double font-bold">系所 </font>來搜尋課程了!<br>
                    <br>
                    如發生顯示問題可以嘗試重新整理頁面或清空課表重建，也可以回報發生問題的選課組合，我們會盡快修復!<br><br>
                    同時要請手機使用者多多包涵，為了實現更多功能，目前手機版的網頁版面不太完善，請使用電腦版瀏覽器以獲得更好的使用體驗。
                </p>
                <div class = "text-center">
                    <button id = "close-modal" class = "bg-orange-300 px-3 py-1 rounded hover:bg-orange-400" @click = "closeModal">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </div>
    
</template>

<script setup>
import { ref } from 'vue';
const showModal = ref(true);
const closeModal = () => showModal.value = false;

// check if localStorage hasn't been set
if(localStorage.getItem('notify') === null)
{
    showModal.value = true;
    localStorage.setItem('notify', 'true');
}
</script>