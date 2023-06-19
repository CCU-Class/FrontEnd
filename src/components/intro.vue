<template>
    <div class = "w-full mx-auto">
        <div>
            <div class = "mx-auto py-12 bg-slate-100">
                <div class = 'w-full px-3 md:w-8/12 mb-3 mx-auto tracking-tight'>
                    <div class = 'bg-gradient-to-br from-orange-300 to-red-700 text-transparent bg-clip-text font-semibold text-3xl'>
                        CCU Pineapple Schedule
                    </div>
                    <div class = 'font-semibold text-3xl'>
                        阿梨課表
                    </div>
                    <div class = 'text-xl text-gray-500 my-1'>
                        歡迎來到專屬於所有中正人的排課與課表製作網頁服務
                    </div>
                </div>
            </div>
            <div class = "w-full px-3 md:w-8/12 mx-auto py-9">
                <div class = 'text-orange-300 font-semibold text-3xl'>
                    初次見面?
                </div>
                <div class = 'text-xl text-gray-500 my-1'>
                    我們是現在就讀於中正大學的學生，為了改善中正學生的排課選課體驗而建立了阿梨課表團隊，<br>
                    希望能透過我們所學和自身經驗打造一個更加舒適且符合中正學生所需的服務。<br><br>
                    目前本網站提供之功能如下<br>
                    <ol class = 'list-decimal list-inside my-3'>
                        <li>
                            手動輸入或搜尋課程資訊(可保存於同裝置之同一瀏覽器)
                        </li>
                        <li>
                            自動計算學分
                        </li>
                        <li>
                            產生對應之課表
                        </li>
                        <li>
                            下載課表圖檔(行動用戶則無此服務)
                        </li>
                    </ol>
                </div>
            </div>
            <div class = "w-full px-3 md:w-8/12 mx-auto py-9">
                <div class = 'text-orange-300 font-semibold text-3xl'>
                    版本紀錄
                </div>
                <div class = 'text-xl text-gray-500 my-1'>
                    v a1.0.0 第一次公開測試版本開放 <br>
                    v a1.5.0 UI大規模重構與優化，準備加入搜尋功能 <br>
                    v a2.0.0 UI全面使用Tailwind改寫 <br>
                    v 3.0.0 加入搜尋功能，並使用MySQL當作資料庫 <br>
                    v 3.0.1 資料庫更改為postgreSQL <br>
                    v 3.1.0 增加計算學分之功能 <br>
                    v 4.0.0 使用 Vue 來完全重構本網站
                </div>
            </div>
            <div class = "w-full text-center px-3 md:w-8/12 mx-auto py-9">
                <div class = 'text-orange-300 font-semibold text-3xl'>
                    聯絡我們
                </div>
                <div class = 'w-8/12 mx-auto my-2'>
                    <a href="mailto:pineappleschedule2023@gmail.com">團隊 email: pineappleschedule2023@gmail.com</a>
                </div>
            </div>
            <div class = "w-full text-center px-3 md:w-8/12 mx-auto pb-2">
                <div class = 'text-orange-300 font-semibold text-3xl'>
                    相關連結
                </div>
                <div class = 'w-8/12 mx-auto my-5'>
                    <a class = 'btn-link' href = 'https://github.com/syzygy608/AhriSchedule' target = "_blank">Github原始碼</a>
                    <a class = 'btn-link' href = 'https://forms.gle/j9MKseJp9e89SAxJ6' target = "_blank">回饋表單</a>
                </div>
            </div>
        </div>
    </div>
</template>

