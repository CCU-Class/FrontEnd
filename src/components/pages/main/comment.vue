<template>
  <div
    class="comment_inside overflow-y-auto overflow-x-hidden bg-[#009688] text-center max-h-[95vh] min-h-[95vh] pb-10">
    <a
      class="text-2xl font-bold text-center text-white py-3 block"
      href="https://ccu.plus/"
      target="_blank">
      <div class="text-2xl font-bold text-center">課程評價</div>
      Powered by
      <img src="/ccuplus.svg" class="w-1/2 mx-auto my-3" />
    </a>
    <button v-on:click="hidden" class="btn-comment mx-3" id="close">
      關閉評價
    </button>
    <div v-if="isLoading" class="my-3">
      <clip-loading-spinner />
    </div>
    <div v-else>
      <div v-if="comment_status" class="text-base">
        <p class="text-green-200 px-3 pt-2">
          因篇幅關係，本介面僅顯示前四層的評論，<br />
          若有需要請至最下方的查看更多查看評價之留言。
        </p>
        <div v-for="comment in comments" class="comment my-6 mx-3">
          <div v-if="comment.deleted" class="text-red-300">
            此評價已被刪除
          </div>
          <div v-else class="comment_content">
            <div
              class="comment_title text-xl font-bold text-left text-green-200">
              <div v-if="comment.user">{{ comment.user }}:</div>
              <div v-else>匿名:</div>
              <hr class="bg-black" />
            </div>
            <div
              class="py-2 px-2 font-serif text-white text-left whitespace-pre-line">
              {{ comment.content }}
            </div>
            <div class="text-gray-300 text-sm text-right">
              <span>受評教師: {{ comment.professor }}</span>
              <span> | </span>
              <span>評價時間: {{ comment.commented_at }}</span>
            </div>
          </div>
          <div v-if="comment.comments.length">
            <div
              v-for="subcomment in comment.comments"
              class="comment py-2 px-3 bg-gray-600/50">
              <div v-if="subcomment.deleted" class="text-red-300">
                此評價已被刪除
              </div>
              <div v-else class="comment_content">
                <div
                  class="comment_title text-xl font-bold text-left text-green-200">
                  <div v-if="subcomment.user">
                    {{ subcomment.user }}:
                  </div>
                  <div v-else>匿名:</div>
                  <hr class="bg-black" />
                </div>
                <div
                  class="py-2 px-2 font-serif text-white text-left whitespace-pre-line">
                  {{ subcomment.content }}
                </div>
                <div class="text-gray-300 text-sm text-right">
                  <span>評價時間: {{ subcomment.commented_at }}</span>
                </div>
              </div>
              <div v-if="subcomment.comments.length">
                <div
                  v-for="subsubcomment in subcomment.comments"
                  class="comment my-2 ml-6 bg-gray-600/50 px-2">
                  <div
                    v-if="subsubcomment.deleted"
                    class="text-red-300">
                    此評價已被刪除
                  </div>
                  <div v-else class="comment_content">
                    <div
                      class="comment_title text-xl font-bold text-left text-green-200">
                      <div v-if="subsubcomment.user">
                        {{ subsubcomment.user }}:
                      </div>
                      <div v-else>匿名:</div>
                      <hr class="bg-black" />
                    </div>
                    <div
                      class="py-2 px-2 font-serif text-white text-left whitespace-pre-line">
                      {{ subsubcomment.content }}
                    </div>
                    <div class="text-gray-300 text-sm text-right">
                      <span
                        >評價時間:
                        {{ subsubcomment.commented_at }}</span
                      >
                    </div>
                  </div>
                  <div v-if="subsubcomment.comments.length">
                    <div
                      v-for="subsubsubcomment in subsubcomment.comments"
                      class="comment my-2 ml-6 px-2 py-2 bg-gray-600/50">
                      <div
                        v-if="subsubsubcomment.deleted"
                        class="text-red-300">
                        此評價已被刪除
                      </div>
                      <div v-else class="comment_content">
                        <div
                          class="comment_title text-xl font-bold text-left text-green-200">
                          <div v-if="subsubsubcomment.user">
                            {{ subsubsubcomment.user }}:
                          </div>
                          <div v-else>匿名:</div>
                          <hr class="bg-black" />
                        </div>
                        <div
                          class="py-2 px-2 font-serif text-white text-left whitespace-pre-line">
                          {{ subsubsubcomment.content }}
                        </div>
                        <div class="text-gray-300 text-sm text-right">
                          <span
                            >評價時間:
                            {{ subsubsubcomment.commented_at }}</span
                          >
                        </div>
                      </div>
                      <div v-if="subsubsubcomment.comments.length">
                        更多留言請上
                        <a
                          :href="link"
                          target="_blank"
                          class="text-green-200"
                          >ccu.plus</a
                        >
                        查看
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <a :href="link" target="_blank" class="btn-comment my-3 py-1"
          >查看更多</a
        >
      </div>
      <p
        v-else
        class="text-green-100 font-extrabold text-2xl my-3 mx-3">
        此門課查無評價或發生問題
      </p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed, ref, watch, onMounted } from "vue";
import { searchCommentsOnCcuplus } from "@functions/ccuplus";
import ClipLoader from "@components/common/ClipLoadingSpinner.vue";

const store = useStore();
const course_id = computed(() => store.state.ccuplus.course_id);
const status = computed(() => store.state.course.show);
const isLoading = ref(true);
const comments = ref([]);
let comment_status = ref(false);
let link = computed(
  () => `https://ccu.plus/courses/${course_id.value}`,
);

const hidden = () => {
  console.log(course_id.value);
  store.dispatch("hidden");
  store.dispatch("purge");
};

watch(course_id, async (newId, oldId) => {
  console.log(newId, oldId);
  isLoading.value = true;
  let data = await searchCommentsOnCcuplus(course_id.value);
  console.log(data.data);
  isLoading.value = false;
  if (data.data.length == 0) comment_status.value = false;
  else comment_status.value = true;
  comments.value = [];
  for (let i = 0; i < Math.min(1000, data.data.length); i++)
    comments.value.push(data.data[i]);
});

onMounted(async () => {
  isLoading.value = true;
  let data = await searchCommentsOnCcuplus(course_id.value);
  isLoading.value = false;
  if (data.data.length == 0) comment_status.value = false;
  else comment_status.value = true;
  comments.value = [];
  for (let i = 0; i < Math.min(1000, data.data.length); i++)
    comments.value.push(data.data[i]);
});
</script>
