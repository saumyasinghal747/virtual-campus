<template>
 <MdSnackbar v-if="$store.state.userProfile.uid==null&&$route.path==='/app'"  md-persistent md-position="left"  :md-active="true">
  You are not signed in. <MdButton @click="$router.push('/login')" class="text-gunn px-3 ml-2 ">
  Sign in
 </MdButton>
 </MdSnackbar>
</template>

<script>
 import auth from '../firebase/firebase'
    import Vue from 'vue';
    import {MdSnackbar, MdButton} from 'vue-material/dist/components'
    Vue.use(MdSnackbar);Vue.use(MdButton)
    export default {
        name: "NoLogin"
    }
</script>

<style scoped src="vue-material/dist/vue-material.css">

</style>
<style scoped src="vue-material/dist/theme/default-dark.css">

</style>
