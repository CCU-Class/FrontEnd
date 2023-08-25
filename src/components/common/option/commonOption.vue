<template>
    <li class="w-full bg-white/70 px-1 py-1 option">
        <button @click="onClick"><slot></slot></button>
        
    </li>
</template>
<style>
    .option{
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
    }
</style>
<script>
    export default {
        name: "commonOption",
        props: {
            onClick: Function,
        },
    }

</script>