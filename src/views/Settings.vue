<template>
    <div class="about bg-black container my-5 text-light p-0" style="height: 100%;width: 100%">
        <h1 class="mb-5 pb-5">Settings</h1>
        <b-container>
            <b-row>
                <b-col cols="2">
                    <div class="overlay">
                    <b-avatar class="base"  size="10em"  button :src="$store.state.userProfile.photoURL" >
                    </b-avatar>
                    <div class="cover" v-b-modal.photoChoose>
                        <div class="text"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pen-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M13.498.795l.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
</svg></div>
                        </div>
                    </div>
                </b-col>
                <b-col class="pt-4">
                    <span class="display-4">{{$store.state.userProfile.displayName}}</span><br/>
                    <h3 class="text-muted mt-2">{{$store.state.userProfile.email}}</h3> 
                </b-col>
            </b-row>
            <b-row><button @click="signOut" class="btn ml-auto float-right mt-5 btn-gunn">Sign out</button></b-row>
        </b-container>

        <b-modal id="photoChoose" centered ok-variant="gunn" @ok.prevent="updateProfile" :no-close-on-backdrop="true" :ok-disabled="uploading" ok-title="Choose" title="Update Profile Picture">
            <div v-if="uploading" class="text-center py-1">
                <b-progress variant="gunn" :value="uploadProgress" ></b-progress>
                <h4 class="text-gunn mt-2">Uploading ...</h4>
            </div>
            <b-row v-else>
                <b-col cols="2"><b-avatar size="lg" class="ml-auto" :src="purl"/></b-col>
                <b-col class="mt-2"><b-form>
                    <b-form-group class="">
                        <b-form-file v-model="pfile"></b-form-file>
                    </b-form-group>

                </b-form></b-col>
            </b-row>


        </b-modal>
    </div>
</template>
<script>
    import {auth, provider, storage} from "../firebase/firebase";
    import router from "../router";
    export default {
        name:'Settings',
        data: () => {return {
            pfile:null,
            purl:auth.currentUser.photoURL,
            uploading: false,
            uploadProgress:0
        }},
        watch:{
            pfile(){
                const theGreaterGood = this;
                if (!this.pfile){
                    return null
                }
                let reader = new FileReader();
                reader.readAsDataURL(this.pfile);
                reader.onloadend = function() {
                     theGreaterGood.purl = reader.result
                }
            }
        },
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

            },
            updateProfile: function (e) {
                const theGreaterGood = this;
                theGreaterGood.uploading = true;//set the stage
                const uploadTask = storage.ref(`/users/${auth.currentUser.uid}/pfp.png`).put(theGreaterGood.pfile);
                uploadTask.on('state_changed',
                function (snapshot) {
                    theGreaterGood.uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                },
                function (error) {

                },
                function () {
                    uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                        auth.currentUser.updateProfile({
                            photoURL: downloadURL
                        });
                        //reset everything
                        theGreaterGood.$bvModal.hide("photoChoose");
                        theGreaterGood.uploadProgress = 0;
                        theGreaterGood.uploading = false;
                        theGreaterGood.purl = null;
                        theGreaterGood.pfile = null;
                    });

                })

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



    .cover{
        transition: .3s ease;
        will-change: opacity;
        opacity:0;
        background-color:black;
        position:relative;
        text-align: center;
        top:-10em;

        left:0em;
        height: 10em;
        padding:auto;
        margin: auto;
        border-radius: 50%;
    }

    .cover .text {
        font-size: 3em;
        font-weight: bolder;
        position: absolute;
        top:25%;left:35%
    }

    .cover:hover{
        opacity: 0.5 !important;
    }
</style>
