<template>
    <div class="about bg-black container my-5 text-light p-0" style="height: 100%;width: 100%">
        <h1 class="mb-4">Settings</h1>


        <!--<form>
            <label class="form-row">Username <input class="form-control mt-2 bg-dark border-dark text-light"/>
            </label>
        </form>-->
        <!--<form>
            <p class="form-text">Color</p>
            <label>
                <input type="radio"/> <span  class="badge badge-success badge-pill"> green</span>
            </label>
        </form>-->
        <button @click="signOut" class="btn float-right mt-5 btn-gunn">Sign out</button>
    </div>
</template>
<script>
    import {auth, provider} from "../firebase/firebase";
    import router from "../router";
    export default {
        name:'Settings',
        methods: {
            signOut: function (){
                auth.signOut().then(function() {
                    // Sign-out successful.
                    console.log('user signed out.');
                     router.push('/')
                }).catch(function(error) {
                    // An error happened.
                    console.log('error');alert(error);
                });

            }
        }
    }
</script>
<style scoped>
    @import '~vue-context/dist/css/vue-context.css';
    .v-context {
        background-color: var(--dark);
    }
    .v-context li a:hover {
        background-color: var(--gray);
    }
</style>
