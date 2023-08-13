<template>
    <div class="w-full top-8 h-8 flex sticky">
        <SearchOutlined class = "ml-auto text-orange-400 w-12 text-3xl" v-on:click="open_search()"/>
        <!-- <img src = "/search_box_icon.png" class = "ml-auto"> -->
    </div>
</template> 

<script setup>

var open_search = function(){
    console.log("open search")
}

</script>
