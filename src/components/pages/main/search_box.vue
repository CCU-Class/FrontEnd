<template>
    <Vue3DraggableResizable :draggable="true" :resizable="false" @dragging="handle_drag" @drag-end="drag_end">
        <div class="w-full top-8 h-8 flex sticky z-50">
            <div class="mr-1 ml-auto w-8 text-3xl relative small transition-all ease-in-out duration-500" 
            :class="{ 'large mr-2 border': !show}" @transitionend="transitionComplete" >
                <div v-if="show" @click="search_button">
                    <SearchOutlined class="absolute left-0 top-0 text-orange-400" v-if="show_icon"/>
                </div>
                <div class = "block large border ml-auto mr-2" v-if="!show">
                    <div class="m-2">
                        <div class = "flex w-full">
                            <div class = "text-black font-bold text-xl">
                                課程搜尋
                            </div>
                            <CloseCircleOutlined class="ml-auto -6" @click="search_button"/>
                        </div>
                        <input class = 'w-full mx-auto py-1 text-center course_search text-xl' type = "search" placeholder = "在此搜尋課程">
                        <ul class = "mx-auto w-11/12 result overflow-y-auto overflow-x-hidden" id = "result">
                            <!-- <loadingSpinner v-if="isLoading" style="height: auto;"></loadingSpinner> -->
                            <!-- <li v-for = "item in data" class = "w-full bg-white/70 px-1 py-1 hover:bg-orange-300 hover:text-white" @click="push_to_table(2, item)">
                                [{{item.id}}] {{item.class_name}} {{item.teacher}} {{item.class_time}} {{item.class_room}} 
                            </li> -->
                        </ul>
                        <div class="bg-orange-200 w-full h-20"></div>
                        <div class="flex w-full h-8 p-2">
                            <div class="m-auto text-base rounded-2xl bg-orange-300 px-3 py-1 hover:bg-orange-200" v-on:click="show_comment">查看評價</div>
                            <div class="m-auto text-base rounded-2xl bg-orange-300 px-3 py-1 hover:bg-orange-200">加入課表</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Vue3DraggableResizable>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();

const show_comment = () =>
{
    store.dispatch("display");
}

const show = ref(true);
const show_icon = ref(true);
const transitionCount = ref(0);
let can_open = false;

const search_button = () => {
    if(!can_open) return;
    show.value = !show.value;
    if(show.value == true){
        setTimeout(() => {
            show_icon.value = !show_icon.value;
        }, 200);
    }else{
        show_icon.value = !show_icon.value;
    }
};

const handle_drag = () => {
    can_open = false;    
};
const drag_end = () => {
    setTimeout(() => {
        can_open = true;
    }, 100);
};

</script>

<style>
.small {
    position: relative;
    background-color: white;
    border-radius: 0.25rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.border{
    border-radius: 0.75rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}

.large {
    width: 20rem;
    height: 28rem;
    background-color: white;
}
</style>
