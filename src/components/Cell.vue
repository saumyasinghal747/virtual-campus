

<template>
    <!-- this should be 20vhx20vh and 0.12vh border in production--><!--class="p-3"--><!--:badge="$store.getters.zoomInfo.uBadge" badge-variant="success"-->
    <div style="border:solid 1vh rgba(0%,0%,0%,0.1)" :style="{height:$store.getters.zoomInfo.cellSize,width:$store.getters.zoomInfo.cellSize}" :class="'bg-'+variant+' '+$store.getters.zoomInfo.padding">
        <span v-if="$store.getters.zoomInfo.people" >
<span v-for="(person,pid) in people" :key="pid" v-long-press="100" @dblclick.prevent="(event)=>{$refs['menu'+pid][0].open(event);}" @contextmenu.prevent="(event)=>{$refs['menu'+pid][0].open(event);}">
     <avatar :badge="$store.getters.zoomInfo.uBadge" :size="$store.getters.zoomInfo.uSize" style="cursor: pointer;"  v-b-tooltip.hover :title="person.username" :id="'speech-'+pid" :person="person" :pid="pid"></avatar>
    <b-popover style="z-index: 10 !important;" :target="'speech-'+pid" disabled :show.sync="person.saying!=undefined && $store.state.userProfile.uid && $store.getters.distanceTo({x,y})<=2" :title="person.username">
    {{(person.saying  || {message:''}).message}}
  </b-popover>
    <b-popover  :target="'speech-'+pid" disabled :show.sync="person.saying!=undefined && $store.state.userProfile.uid && $store.getters.distanceTo({x,y})>2" >&hellip;
  </b-popover>
    <vue-context :ref="'menu'+pid">
            <li>
                <a v-b-modal="'profile-'+pid">Profile</a>
            </li>
            <li>
                <a @click.prevent="addFriend(pid)">Friend</a>
            </li>
        </vue-context>
    <b-modal body-bg-variant="black"  body-text-variant="light" header-text-variant="light" header-bg-variant="black" header-border-variant="black" hide-footer centered :id="'profile-'+pid" >
<template v-slot:modal-header>
    <b-row class="d-flex align-items-center">
        <avatar class="mx-3" :pid="pid" :person="person"></avatar>
        <b-col>
            <b-row>
                <span class="mr-auto h4">{{person.username}}</span>
            </b-row>
            <b-row>
                <span class="text-muted">{{($store.state.users[pid]||{presence:undefined}).presence? ($store.state.users[pid].presence.status==='online'?'Online':($store.state.users[pid].presence.status=='idle'? 'Idle':('Last Seen'))):'Offline'}} <span v-if="($store.state.users[pid].presence||{status:'nothing'}).status==='offline'">{{ new Date($store.state.users[pid].presence.lastSeen) | moment('calendar')}}</span></span>
            </b-row>
        </b-col>
         </b-row>
</template>
    <p class="my-4 text-muted"> Nothing here!
      </p>

  </b-modal>
</span>
        </span>

    </div>
</template>

<script>

    import Avatar from "./avatar";
    export default {
        name: "Cell",
        components: {Avatar},
        props:['people','variant','x','y'],
        methods:{
            addFriend: function(friendUid){
                console.log(friendUid)
            },
            viewProfile: function(person){
                console.log("View Profile of "+person)
            }
        }
    }
</script>

<style scoped>
    @import '~vue-context/dist/css/vue-context.css';
    .v-context {
        background-color: var(--black);
        opacity: 0.7;
        color: var(--white);
    }
    .v-context li a{
        cursor: pointer;
    }
    .v-context li a:hover {
        background-color: #202020;
    }
</style>
<!-- https://discordapp.com/channels/710932856251351111/710936824121655396/751998173152673813 for reference to colors-->
