<template>
    <div class="pt-5 my-5" style="height: 100%;width:100%;" >
        <div class="row text-right">
            <div class="col-5 text-light">
                <span class="display-1">Welcome</span>
            </div>
            <div class="col display-1">
                <div class="row">
                    <span class="text-warning" style="animation: 2s ease-out 0s 1 slideInUp;opacity: 0;position:absolute;">back to School</span>
                </div>
                <div class="row">
                    <span class="text-grass" style="animation: 2s ease-out 2s 1 slideInUp;opacity: 0;position:absolute;">back to Normal</span>
                </div>
                <div class="row">
                    <span class="text-info" style="animation: 2s ease-out 4s 1 slideInUp;opacity: 0;position:absolute;">back to Fun</span>
                </div>
                <div class="row">

                        <span class="text-gunn" style="animation: 8s ease-out 0s 1 slideIn;">back to <b>Gunn</b></span>

                </div>


                <div class="row">
                    <b-button size="lg" variant="gunn" @click="$router.push('/app')" style="position:absolute;top:40vh;border-radius: 0" class="mt-5  mx-auto">Launch Campus</b-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

    import Vue from 'vue';

    export default {

        name: "Greeter"
    }
</script>

<style scoped src="vue-material/dist/vue-material.css">

</style>
<style scoped src="vue-material/dist/theme/default-dark.css">

</style>

