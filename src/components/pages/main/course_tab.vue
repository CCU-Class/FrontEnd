<template>
  <div
    class="w-full overflow-x-auto rounded-lg bg-orange-100 px-2 py-2 mx-auto flex flex-nowrap md:w-[calc(100%-2rem)] md:max-w-[960px]">
    <div
      v-for="(tab, index) in tabs"
      :key="index"
      @click="setactiveIndex(index)"
      @dblclick="activateInputFocus(index)"
      :class="[
        'tab rounded-lg text-center justify-center py-2 px-4 mx-1 flex max-w-full flex-auto grow-0 min-w-[5rem] w-36',
        {
          'bg-orange-300': activeIndex === index,
          'bg-orange-200': activeIndex !== index,
        },
      ]">
      <div class="w-[8rem] text-center" v-if="!tabIsEditing[index]">
        {{ show_tab_name(tab.name) }}
      </div>
      <input
        v-else
        v-model="tab.name"
        @blur="
          renameTab(index, tab.name);
          tabIsEditing[index] = false;
        "
        @keyup.enter="$event.target.blur()"
        class="bg-transparent !shadow-none w-[8rem] max-w-[90%] text-center border border-transparent focus:outline-none focus:border-white focus:bg-white/60" />
      <button
        @click.stop="removeTab(index)"
        v-if="tabs.length > 1 && activeIndex === index"
        class="ml-2 font-bold hover:text-red-700 inline-flex items-center justify-center z-20">
        <CloseOutlined />
      </button>
    </div>
    <button
      @click="addTab"
      class="tab rounded-lg text-center py-2 px-4 bg-orange-200 hover:bg-orange-300 mx-1">
      +
    </button>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from "vue";
import store from "@/store";
import { CloseOutlined } from "@ant-design/icons-vue";
import { useRoute } from "vue-router";
import { getsharecourse } from "@functions/save_course";

onMounted(async () => {
  const route = useRoute();
  const recordId = route.query.record_id;
  if (!recordId) return;
  // 回傳分享的課表的編號
  if (tabs.value.length >= 8) {
    alert("最多只能開啟 8 組課表!");
    return;
  }
  let result = await getsharecourse(recordId);
  console.log(result);
  if (result) {
    const data = result.json_data;
    // console.log(data);
    store.dispatch("importTabs", data);
    window.location.href = "/#/main";
  } else {
    window.location.href = "/#/record/error";
  }
});

const tabs = computed(() => store.state.course.TotalCourseData);
store.dispatch("init_tab_is_editing", tabs.value.length);

const tabIsEditing = computed(
  () => store.state.general.tab_is_editing,
);

const addTab = () => {
  if (tabs.value.length >= 8) {
    alert("最多只能開啟 8 組課表!");
    return;
  }
  store.dispatch("open_main_modal");
};

const oldName = ref("");

const show_tab_name = (tab_name) => {
  if (tab_name.length > 8) return tab_name.slice(0, 6) + "...";
  return tab_name;
};

const activateInputFocus = (index) => {
  oldName.value = tabs.value[index].name;
  tabIsEditing.value[index] = true;
  setTimeout(() => {
    let div = document.getElementsByClassName("tab")[index];
    let input = div.querySelector("input");
    input.select();
    input.focus();
  }, 10);
};

function renameTab(index, newName) {
  console.log("rename");
  if (newName === "") {
    tabs.value[index].name = oldName.value;
    alert("名稱不可為空!");
    return;
  }
  if (tabs.value[index]) {
    store.dispatch("renameTabs", {
      id: tabs.value[index].id,
      name: newName,
    });
  }
}

const removeTab = (index) => {
  if (tabs.value.length === 1) {
    alert("至少要保留一組課表!");
    return;
  }
  if (confirm("確定要刪除此課表?") === false) return;
  store.dispatch("deleteTabs", tabs.value[index].id);
};

const activeIndex = computed(() => store.state.course.activeIndex);

const setactiveIndex = (index) => {
  store.dispatch("setactiveIndex", index);
};
</script>
