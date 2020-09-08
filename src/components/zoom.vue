<template>
    <div  style="position:fixed;top:3vh;right:3vw;width:3rem;height: 6rem;border-radius:9%;opacity:0.5;" class="bg-black">
        <div style="width: 100%;height: 50%" class="button"><b-icon-plus variant="light" scale="3" shift-h="15" shift-v="-12"/></div>
        <div style="width: 100%;height: 50%" class="button"><b-icon-dash variant="light" scale="3" shift-h="15" shift-v="-12"/></div>


    </div>
</template>

<script>
    export default {
        name: "zoom"
    }
</script>

<style scoped>
.button:hover{
    background-color: #404040;
    border-radius: 9%;
}
</style>