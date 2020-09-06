

<template>
    <!-- this should be 15vh and 0.12vh in production-->
    <div style="height: 5vh;width: 5vh;border:solid 0.12vh black" class="p-3" :class="'bg-'+variant">
        <!--<span v-for="person in people" >
             <b-avatar :badge="true" badge-variant="success" variant="gunn"  style="cursor: pointer;margin:0.15rem" v-b-tooltip.hover :title="person.username">{{ person.username.split(' ').map(v => v.substring(0,1)).join('') }}</b-avatar>
        </span>-->
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