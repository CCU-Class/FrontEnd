<template>
    <div class="color-picker">
        
        <!-- <ColorPicker :color="color" 
                    default-format="rgb"
                    :alpha-channel='hide'
                    
                    @color-change="updateColor" /> -->
        <p>#</p>
        <input type="text" placeholder="輸入色碼">
        
    </div>
    <div>
        <button>取消</button>
        <button>確認</button>
    </div>
    
</template>

<style>
    .color-picker {
        width: 200%;
        height: 100%;
        max-width: 100%;
        max-height: 100%;
    }
</style>


<script>
    import {ColorPicker} from 'vue-accessible-color-picker';
    import {ref} from 'vue';
    let color = ref("rgb(0,0,0)");
    export default{
        components:{
            ColorPicker
        },
        methods:{
            updateColor (eventData) {
                color.value = eventData.cssColor;
                console.log(`selected color: ${color.value}`);
            }
        }
    }
</script>