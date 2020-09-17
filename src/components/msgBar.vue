<template>
    <div>
    <b-form v-if="$store.state.userProfile.uid" @submit.prevent="onSend" @keyup.up="lastAgain" style="position: fixed;bottom: 5%;width:50%;left:25%" class="mx-auto  input-bar">
       <div class="input-group">
        <b-form-input maxlength="100" autocomplete="false" v-model="message" placeholder="Type your message here" class="form-control form-control-lg" />
<b-input-group-append>
    <div class="button text-white" @click="onSend" >
        <font-awesome-icon icon="paper-plane" size="2x" style="transform: translateY(0.4rem) translateX(0.4rem)"></font-awesome-icon>
    </div>
</b-input-group-append>

       </div>
    </b-form>

    </div>
</template>

<script>
    export default {
        name: "msgBar",
        data(){
            return {
                message:'',
                lastSent:'',

            }
        },
        methods:{
            onSend(){
                if (this.message.length===0){
                    return;
                }
                this.$emit('message',this.message)
                //console.log(this.message);
                this.lastSent = this.message;

                this.message = "";

            },
            lastAgain(){
                if (this.lastSent.length===0){return}
                this.message = this.lastSent
            }
        }
    }
</script>

<style scoped>
    .form-control::placeholder{
        color:rgba(100%,100%,100%,0.5)
    }

.form-control{
    background-color: rgba(0,0,0,0.5);
    color: whitesmoke;
    border:none;
    box-shadow: none;
    caret-color: var(--white);
}
    .form-control:focus{
        background-color: rgba(0,0,0,0.3);
    }

    .button:hover{
       opacity:0.3;

    }
    .button{
        border-top-right-radius: 9%;
        border-bottom-right-radius: 9%;
        cursor: pointer;
        border:none;
        width:3rem;/*height: 3rem;*/
        opacity:0.5;background-color: black;
    }
</style>
