<template>
    <div style="position:fixed;top:3vh;right:3vw;">
    <div  style="width:2.5rem;height: 5rem;border-radius:9%;opacity:0.5;" class="bg-black">
        <div v-b-tooltip.hover.left="'Zoom In'" @click="$store.commit('increaseZoom')" style="width: 100%;height: 50%" class="button"><b-icon-plus variant="light" scale="2.5" shift-h="12" shift-v="-7"/></div>
        <div v-b-tooltip.hover.left="'Zoom Out'" @click="$store.commit('decreaseZoom')" style="width: 100%;height: 50%" class="button"><b-icon-dash variant="light" scale="2.5" shift-h="12" shift-v="-7"/></div>


    </div>
        <div v-if="$store.state.userProfile.uid" style="width:2.5rem;height: 2.5rem;border-radius:9%;opacity:0.5;" class="bg-black mt-2 text-light">
            <div v-b-tooltip.hover.left="'Fly to me'" @click="$store.dispatch('moveNowhere')" class="button" style="width:100%;height: 100%">
                <!--<font-awesome-icon transform="right-3 down-4" size="2x" icon="paper-plane"></font-awesome-icon>-->
                <b-icon-cursor-fill  variant="light" scale="1.7" shift-h="12" shift-v="-7"></b-icon-cursor-fill>

            </div>

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
