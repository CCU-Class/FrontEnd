<template>
    <div class = "comment_inside overflow-y-auto overflow-x-hidden bg-[#009688] text-center max-h-[95vh] min-h-[95vh] pb-10">
        <a class = "text-2xl font-bold text-center text-white py-3 block" href = "https://ccu.plus/" target = "_blank">
            <div class = "text-2xl font-bold text-center">課程評價</div>
            Powered by
            <img src = "/ccuplus.svg" class = "w-1/2 mx-auto my-3">
        </a>
        <button v-on:click = "hidden" class = 'btn-comment mx-3'>關閉評價</button>
        <p v-if = "comment_status" class = "text-base">
            <p class = "text-green-200 px-3 pt-2">
                因篇幅關係，本介面僅顯示最頂層的評論，<br>
                若有需要請至最下方的查看更多查看評價之留言。
            </p>
            <div v-for = "comment in comments" class = "comment my-2 mx-3 un">
                <div v-if = " comment.deleted" class = "text-red-300">此評價已被刪除</div>
                <div v-else class = "comment_content">
                    <div class = "comment_title text-xl font-bold text-left text-green-200">
                        <div v-if = "comment.user"> {{ comment.user }}:</div>
                        <div v-else>匿名: </div>
                        <hr class = "bg-black">
                    </div>
                    <div class = "py-2 px-2 font-serif text-white text-left whitespace-pre-line">{{ comment.content }}</div>
                    <div class = "text-gray-300 text-sm">
                        <span>受評教師: {{ comment.professor }}</span>
                        <span> | </span> 
                        <span>評價時間: {{ comment.commented_at }}</span>
                    </div>
                </div>
            </div>
            <a :href = "link" target = "_blank" class = "btn-comment my-3 py-1">查看更多</a>
        </p>
        <p v-else class = "text-green-100 font-extrabold text-2xl my-3 mx-3">此門課查無評價</p> 
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed, ref, watch, onMounted } from 'vue';
import { searchCommentsOnCcuplus } from '@functions/ccuplus';

const store = useStore();
const course_id = computed(() => store.state.ccuplus.course_id);
const status = computed(() => store.state.course.show);
const comments = ref([]);
let comment_status = ref(false);
let link = computed(() => `https://ccu.plus/courses/${course_id.value}`);

const hidden = () =>
{
    console.log(course_id.value);
    store.dispatch("hidden")
    store.dispatch("purge");
};

onMounted(async () => {
    let data = await searchCommentsOnCcuplus(course_id.value);
    if(data.data.length == 0)
        comment_status.value = false;
    else
        comment_status.value = true;
    for(let i = 0; i < Math.min(10, data.data.length); i++)
        comments.value.push(data.data[i]);
});
</script>