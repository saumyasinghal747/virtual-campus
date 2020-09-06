

<template>
    <!-- this should be 15vh and 0.12vh in production-->
    <div style="height:2vh;width: 2vh;border:solid 0.12vh black" class="p-3" :class="'bg-'+variant">
        <span v-for="person in people" >
             <b-avatar :badge="true" badge-variant="success" variant="gunn"  style="cursor: pointer;margin:0.15rem" v-b-tooltip.hover :title="person.username">{{ person.username.split(' ').map(v => v.substring(0,1)).join('') }}</b-avatar>
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