<template>
    <div v-if="$store.state.userProfile.uid" style="position:fixed;bottom:2vh;right:2vw;width:10.5rem;height: 10.5rem;border-radius: 50%;opacity:0.5;" class="bg-black">
        <span @click="$store.dispatch('moveUserUp')"><b-avatar variant="light" style="transform: translateX(4rem) translateY(1rem)" >
            <b-icon-caret-up-fill></b-icon-caret-up-fill>
        </b-avatar></span>
        <span @click="$store.dispatch('moveUserDown')"><b-avatar variant="light" style="transform: translateX(1.6rem) translateY(7rem)" >
            <b-icon-caret-down-fill/>
        </b-avatar></span>
        <span @click="$store.dispatch('moveUserLeft')"><b-avatar  variant="light" style="transform: translateX(-4rem) translateY(4rem)" >
            <b-icon-caret-left-fill/>
        </b-avatar></span>
        <span @click="$store.dispatch('moveUserRight')"><b-avatar variant="light"  style="transform: translateX(-0.4rem) translateY(4rem)" >
            <b-icon-caret-right-fill/>
        </b-avatar></span>
    </div>
</template>

<script>
    export default {
        name: "compass"
    }
</script>

<style scoped>
    span{
        cursor: pointer;
    }
</style>