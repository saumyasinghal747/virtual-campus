<template>
    <div class="container mt-5 text-light">
        <h1>Please log in.</h1>
        <h4>Remember to use your PAUSD account!</h4>
        <img class="mt-5 " id="gButton" @mouseout="toggleButton" @mouseenter="toggleButton" :src="gButton"  @click="signIn" alt="Sign in with Google"/>
        <b-modal id="my-modal">Sorry, but your email must end in 'pausd.us'. If you're a teacher and are trying to sign in with a 'pausd.org' account, please email <a href="mailto:ss44523@pausd.us">ss44523@pausd.us</a> to create a teacher mode.</b-modal>
    </div>
</template>
<script>
    import {auth, provider} from "../firebase/firebase";
    import * as gbNormal from  "./../assets/google_signin_buttons/web/2x/btn_google_signin_dark_normal_web@2x.png"
    import * as gbHover from "./../assets/google_signin_buttons/web/2x/btn_google_signin_dark_pressed_web@2x.png"
    import store from './../store/index'
    export default {
        name: "Login",
        data (){
            return {
                gButton: gbNormal
            }
        },
        store: store,
        methods:
            {
                toggleButton: function (){
                    this.gButton = (this.gButton==gbNormal? gbHover : gbNormal)
                },

                signIn: function (){
                    auth.signInWithPopup(provider).then((result) => {
                        // This gives you a Google Access Token.
                        var token = result.credential.accessToken;
                        // The signed-in user info.
                        var user = result.user;
                        console.log(user.email);


                        //this is where you return if the email is not PAUSD.
                        const domain = user.email.split('@')[1];
                        if (domain !== 'pausd.us' && user.email!=='saumyasmathtutoring@gmail.com'){
                            console.log("Not PAUSD!");
                            user.delete()
                            this.$bvModal.msgBoxOk(
                                [this.$createElement('p', { domProps: { innerHTML: `Sorry, but your email must end in 'pausd.us'.<br/><br/> If you're a teacher and are trying to sign in with a 'pausd.org' account, please email <a  href="mailto:ss44523@pausd.us" class="text-gunn">ss44523@pausd.us</a> to create a teacher mode.` } })]
                                , {
                                centered:true,
                                    title:'PAUSD only!',

                                okVariant:"gunn"
                            })
                            return;
                        }
                        else {
                            this.$store.dispatch('fetchUserProfile', { //now that we know who they are, we need to log this person in to GC.
                                // This is NOT the actual login method.
                                user: user,
                                token: token
                            })
                        }
                    });
    }
            }
    }
</script>
<style scoped>

    img{
        cursor: pointer;
    }
</style>