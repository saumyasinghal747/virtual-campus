<template>
    <b-avatar :size="size" :badge="badge" :badge-variant="($store.state.users[pid]||{presence:undefined}).presence? ($store.state.users[pid].presence.status=='online'?'success':($store.state.users[pid].presence.status=='idle'? 'warning':'secondary')):'secondary'"
              :alt="person.username.split(' ').map(v => v.substring(0,1)).join('')"  :src="person.photo||null" variant="gunn" :text=" person.username.split(' ').map(v => v.substring(0,1)).join('') "></b-avatar>

</template>

<script>
    export default {
        name: "avatar",
        props:{person:null,pid:null,badge:{
            default:true
            },
            size:{
            default:null
            }
        }
    }
</script>

<style scoped>

</style>
