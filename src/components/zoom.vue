<template>
    <div style="position:fixed;top:3vh;right:3vw;">
    <div  style="width:3rem;height: 6rem;border-radius:9%;opacity:0.5;" class="bg-black">
        <div v-b-tooltip.hover.left="'Zoom In'" @click="$store.commit('increaseZoom')" style="width: 100%;height: 50%" class="button"><b-icon-plus variant="light" scale="3" shift-h="15" shift-v="-12"/></div>
        <div v-b-tooltip.hover.left="'Zoom Out'" @click="$store.commit('decreaseZoom')" style="width: 100%;height: 50%" class="button"><b-icon-dash variant="light" scale="3" shift-h="15" shift-v="-12"/></div>


    </div>
        <div v-if="$store.state.userProfile.uid" style="width:3rem;height: 3rem;border-radius:9%;opacity:0.5;" class="bg-black mt-2 text-light">
            <div v-b-tooltip.hover.left="'Fly to me'" @click="$store.dispatch('moveNowhere')" class="button" style="width:100%;height: 100%"><font-awesome-icon transform="right-3 down-4" size="2x" icon="paper-plane"></font-awesome-icon></div>

        </div>
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
    .button{
        cursor: pointer;
    }
</style>