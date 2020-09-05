<template>
    <div style="height: 20vh;width: 20vh;border:solid 3px black" >
        <span v-for="person in people" >
            <button type="button" class="btn btn-secondary" data-toggle="tooltip" data-placement="top" title="Tooltip on top">
 {{person.username}}
</button>
        </span>
    </div>
</template>

<script>
    export default {
        name: "Cell",
        props:['people'],
        mounted() {

        }
    }
</script>

<style scoped>

</style>