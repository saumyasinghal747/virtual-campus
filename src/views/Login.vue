<template>
    <div class="container mt-5 text-light">
        <p><span class="display-3 mr-5">Welcome back to Gunn</span></p>
        <h3 class="my-3">Sign in to access the campus.</h3>
        <h4>Remember to use your PAUSD account!</h4>
        <h3 class="mt-5">Terms and Conditions</h3>
        <hr class="text-white bg-light"/>
        <h6 class="text-muted mb-3">By signing in, you agree to these terms.</h6>

        <h5>Copyright</h5>
        <p>
            All files and information contained in this Website or Blog are copyright by Saumya Singhal, and may not be duplicated, copied, modified or adapted, in any way without our written permission. Our Website or Blog may contain our service marks or trademarks as well as those of our affiliates or other companies, in the form of words, graphics, and logos.

            Your use of our Website, Blog or Services does not constitute any right or license for you to use our service marks or trademarks, without the prior written permission of Saumya Singhal.

            Our Content, as found within our Website, Blog and Services, is protected under United States and foreign copyrights. The copying, redistribution, use or publication by you of any such Content, is strictly prohibited. Your use of our Website and Services does not grant you any ownership rights to our Content.
        </p>

        <h5>Online Behaviour</h5>
        <p>You will not impersonate another student or use another student's account as your own.

            You will follow proper online etiquette, which means no bullying, harassment, or

            taking any actions with the intention to harm another person's emotions or security.

            I do have the power to report anything you say to a school official, as this is a valid form of social media.
        </p>
        <p>
            If you wouldn't say it in front of a teacher, don't say it here.
        </p>

        <h5>Use of Software</h5>
        <p>
            You will not access our services from any other source than this website or an embed of this website.

            You will not execute scripts that directly or indirectly affect this website and are not authored by Saumya Singhal.

        </p>

        <h5>Penalties</h5>
        <p>
            Violation of this agreement can and will result in your account being suspended for up to two weeks or permanently disabled.
        </p>
        <hr class="text-white bg-light"/>
        <img class="my-5 " id="gButton" @mouseout="toggleButton" @mouseenter="toggleButton" :src="gButton"  @click="signIn" alt="Sign in with Google"/>
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
