<template>
    <div class = "comment_inside overflow-y-auto overflow-x-hidden py-6 max-h-[95vh]">
        <button v-on:click = "hidden" class = 'btn-normal mx-3'>關閉評價</button>
        <p v-if = "comment_status" class = "text-red-400">
            <div v-for = "comment in comments" class = "comment">
                <div v-if =" comment.deleted" class = "text-red">此評價已被刪除</div>
                <div v-else class = "comment_content">
                    <div class = "comment_title">
                        <div v-if = "comment.user"> {{ comment.user }}</div>
                        <div v-else>匿名</div>
                    </div>
                    <div class = "comment_text">{{ comment.content }}</div>
                </div>
                ??
            </div>
        </p>
        <p v-else class = "text-red">此門課查無評價</p>
    </div>
</template>

<script setup>
import { useStore } from 'vuex';
import { computed } from 'vue';

const store = useStore();
const comment_status = computed(() => store.state.ccuplus.status);
const comments = computed(() => store.state.ccuplus.comments);

const hidden = () =>
{
    console.log(comments.value);
    store.dispatch("hidden")
    store.dispatch("clear_comments")
};

</script>