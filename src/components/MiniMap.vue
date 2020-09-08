<template>

    <div style="opacity:0.5;position:fixed;bottom:2vh;left:27%;border-radius:10%;height: 14rem;width:20rem" class="bg-black">
        <b-badge style="position:absolute;" :style="{top:$store.state.users[$store.state.userProfile.uid].location[0]/70 , left:$store.state.users[$store.state.userProfile.uid].location[1]/100 }" class="p-1" variant="success">:D</b-badge>
    </div>


</template>

<script>
    import store from '../store/index'
    export default {
        name: "MiniMap",
        computed:{
            uloc:()=>{
                return store.state.users[store.state.userProfile.uid].location
            }
        }
    }
</script>

<style scoped>

</style>