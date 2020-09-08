

<template>
    <!-- this should be 20vhx20vh and 0.12vh border in production--><!--class="p-3"-->
    <div style="border:solid 1vh rgba(0%,0%,0%,0.1)" :style="{height:$store.getters.zoomInfo.cellSize,width:$store.getters.zoomInfo.cellSize}" :class="'bg-'+variant+' '+$store.getters.zoomInfo.padding">
        <span v-if="$store.getters.zoomInfo.people" >

             <b-avatar :size="$store.getters.zoomInfo.uSize" v-for="person of people" :badge="$store.getters.zoomInfo.uBadge" badge-variant="success" variant="gunn"  style="cursor: pointer;" v-b-tooltip.hover :title="person.username">{{ person.username.split(' ').map(v => v.substring(0,1)).join('') }}</b-avatar>
        </span>
    </div>
</template>

<script>
    export default {
        name: "Cell",
        props:['people','variant'],
        mounted() {

        }
    }
</script>

<style scoped>

</style>
<!-- https://discordapp.com/channels/710932856251351111/710936824121655396/751998173152673813 for reference to colors-->