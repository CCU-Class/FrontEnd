<template>
    <div class = "z-10 top-0 left-0 w-screen h-screen fixed flex items-center backdrop-blur-sm" v-show = "showModal">
        <div id = "modal-container" class = "fixed inset-0 items-center justify-center h-6/12 w-7/12 mx-auto" v-show="showModal">
            <div class = "bg-white p-8 rounded shadow-lg">
                <h2 class = "text-xl font-semibold mb-4"> 提醒 </h2>
                <p class = "mb-4">
                    本課表網站提供自定義課程輸入與搜尋功能，為了提供更客製化的自訂課表，點擊課表上的課程可以進行課程格的顏色修改，並且可以進行課程的刪除。<br>
                    另外，為了更方便搜尋課程，因此設計了浮動式的搜尋框，可以在查看課表時同時進行課程的搜尋。<br>
                    同時本站也有課表下載成圖片的功能，歡迎大家多多使用。<br><br>
                    同時要請手機使用者多多包涵，為了實現更多功能，目前手機版的網頁版面不太完善，請使用電腦版瀏覽器以獲得更好的使用體驗。
                </p>
                <button id = "close-modal" class = "bg-orange-300 px-3 py-1 rounded hover:bg-orange-500" @click = "closeModal">
                    Close
                </button>
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