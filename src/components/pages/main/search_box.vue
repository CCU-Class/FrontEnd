<template>
    <Vue3DraggableResizable :draggable="true" :resizable="false" @dragging="handle_drag" @drag-end="drag_end" 
    :x="elementLeft" :y="elementTop">
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
                        <input class = 'w-full mx-auto py-1 text-center course_search' type = "search" placeholder = "在此搜尋課程"  v-model = "searchInput">
                        <ul class = "mx-auto w-full result overflow-y-auto overflow-x-hidden" style="max-height: 10rem;" id = "result">
                             <loadingSpinner v-if="isLoading" style="height: auto;"></loadingSpinner> 
                             <li v-else v-for = "item in data" class = "w-full bg-white/70 px-1 py-1 hover:bg-orange-300 hover:text-white cursor-pointer border-2" style="font-size: smaller;" @click="selectCourse(item)">
                                {{item.class_name}} <br>
                                {{item.teacher}} 
                            </li> 
                        </ul>
                        <div class="bg-orange-200 w-full h-40 border-orange-300 border-2">
                            <!-- 使用到selectedCourse -->
                            <div v-if="!selectedNull" class="text-sm">
                                <p>課程ID:{{selectedCourse.id}}</p>
                                <p>課程名稱:{{selectedCourse.class_name}}</p>
                                <p>教師:{{selectedCourse.teacher}}</p>
                                <p>學分:{{selectedCourse.credit}}</p>
                                <p>教室:{{selectedCourse.class_room}}</p>
                                <p>時間:{{selectedCourse.class_time}}</p>

                            </div>
                            
                        </div>
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
import { onMounted, onUpdated, ref, watch, reactive, computed } from 'vue';
import { useStore } from "vuex";
import {searchCourse} from "@functions/course_search.ts";
import {Course} from "@functions/general.ts";

const store = useStore();

const show_comment = () =>
{
    store.dispatch("display");
}

const show = ref(true);
const show_icon = ref(true);
const transitionCount = ref(0);
let can_open = false;

const searchInput = ref('');
const isLoading = ref(false);
const isInputEmpty = ref(true);
let inputValue = searchInput.value.trim();
let data = ref([]);
const noData = computed(() => data.value.length==0);

let selectedCourse = ref(null);
const selectedNull =  ref(true);


const search_button = () => {
    if(!can_open) return;
    show.value = !show.value;
    if(show.value == true){
        setTimeout(() => {
            show_icon.value = !show_icon.value;
            console.log("fuck you");
            selectedNull.value = true;
            selectedCourse.value = null;
            searchInput.value = '';
        }, 200);
    }else{
        show_icon.value = !show_icon.value;
    }
};


watch(searchInput, async (inputValue) => {
    let list = document.getElementById("result");
    if(inputValue != "")
    {   
        isInputEmpty.value = false;
        isLoading.value = true;
        list.classList.remove("result");
        list.classList.add("result-show");
        data.value = await searchCourse(inputValue);
        isLoading.value = false;
    }
    else
    {
        isInputEmpty.value = true;
        list.classList.remove("result-show");
        list.classList.add("result");
        isLoading.value = false;
    }
});


const selectCourse = (course)=>{
    
    selectedCourse.value = course;
    console.log(selectedCourse.value);
}

watch(selectedCourse, async ()=>{
    selectedNull.value = (selectedCourse.value == null);
});

const mouse_x = ref(0);
const mouse_y = ref(0);

window.addEventListener("mousemove", (event) => {
    // y = 0 ~ screen.height - 28 rem
    // x = 0 ~ screen.width - 20 rem
    mouse_x.value = Math.max(0, Math.min(event.clientX, window.innerWidth - 320));
    mouse_y.value = Math.max(0, Math.min(event.clientY, window.innerHeight - 448));
    //console.log(mouse_x.value, mouse_y.value);
});

const handle_drag = (event) => {
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
