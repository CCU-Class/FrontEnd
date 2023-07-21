<template>
    <input class = 'mx-2 w-10/12 py-1 rounded-md text-center' type = "text" placeholder = "在此搜尋課程" id = "search" v-model="keyword" v-on:input="searchCourse(keyword)"/>
    <ul class="list-group " id="list-box" style="overflow: auto;">
        <!-- <li v-for="item in searchResults" :key="item.id" @click="selectCourse(item)">
            {{item.class_name}}
        </li> -->
        
    </ul>
</template>

<script>
import axios from "axios";
    var showResults = false;
    var searchResults = [];
    var timer = null;
export default {
    data(){
        return{
           
        };
    },
    methods:{
        searchCourse(keyword){
            if (this.timer) {
                clearTimeout(this.timer);
            }
            this.timer = setTimeout(() => {
                if(keyword != ""){
                    showResults = true;
                    var xhr = new XMLHttpRequest();
                    xhr.open("GET", "/searchCourse?keyword=" + keyword);
                    xhr.responseType='json';
                    xhr.send();
                    xhr.onload = ()=>{
                        let response = xhr.response;
                        if(response == null)return;
                        let data = response.rows;
                        if(data == null || data.length == 0)return;
                        this.searchResults = data;
                        console.log(this.searchResults);
                    }
                }else{
                    showResults = false;
                }
            }, 250);
        },
        selectCourse(item){
            console.log(item);
            
            showResults = false;
        }
        
    }
}

</script>