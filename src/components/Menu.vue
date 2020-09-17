<template>
    <!--<md-speed-dial >
        <md-speed-dial-target>
            <md-icon>add</md-icon>
        </md-speed-dial-target>

        <md-speed-dial-content>
            <md-button class="md-icon-button">
                <md-icon>note</md-icon>
            </md-button>

            <md-button class="md-icon-button">
                <md-icon>event</md-icon>
            </md-button>
        </md-speed-dial-content>
    </md-speed-dial>-->
    <MdSpeedDial style="position:fixed;top:2vh;left:2vw;z-index: 3"  md-direction="bottom">
        <MdSpeedDialTarget class="bg-gunn">
            <font-awesome-icon class="text-light md-morph-initial" size="2x" icon="bars"></font-awesome-icon>
            <font-awesome-icon class="text-light md-morph-final" size="2x" icon="times"></font-awesome-icon>
        </MdSpeedDialTarget>
        <md-speed-dial-content>
            <!--<md-button :class="$route.path==='/'? 'active':''"  @click="$router.push('/');" class="md-icon-button">
                <\!--<font-awesome-icon  icon="home"></font-awesome-icon>--\>/

            </md-button>-->
            <md-button :class="$route.path==='/app'? 'active':''" @click="$router.push('/app');" class="md-icon-button ">
                <font-awesome-icon  icon="home"></font-awesome-icon>

            </md-button>
            <md-button :class="$route.path==='/settings'? 'active':''" @click="$router.push('/settings')" class="md-icon-button ">
                <font-awesome-icon  icon="cog"></font-awesome-icon>
            </md-button>
            <md-button :class="$route.path==='/about'? 'active':''" @click="$router.push('/about')" class="md-icon-button ">
                <font-awesome-icon icon="info"></font-awesome-icon>
            </md-button>
        </md-speed-dial-content>
    </MdSpeedDial>
</template>

<script>
    import Vue from 'vue';
import {MdSpeedDial, MdButton} from 'vue-material/dist/components'
Vue.use(MdSpeedDial);Vue.use(MdButton)
    export default {
        name: "Menu"
    }
</script>

<style scoped src="vue-material/dist/vue-material.min.css">

</style>
<style scoped src="vue-material/dist/theme/default.css"></style>
<style>
    .active {
        background-color: #651414 !important;
        color:  white !important
    }
</style>
