<template>
  <div class="home"  style="overflow: scroll;white-space: nowrap;">

    <div  style="overflow: visible;white-space: nowrap;flex-wrap: nowrap;" v-for="(i,idx) in grid" class="text-nowrap row">
      <div style="white-space: normal; display: inline-block;" v-for="(j, jdx) in i" ><Cell :people="j.people" :variant="j.type" :x="jdx" :y="idx" /></div>
    </div>
<Compass/>
    <zoom/>
    <info/>
<MsgBar v-on:message="sendMessage" />
  </div>
</template>

<script>
// @ is an alias to /src
import Cell from "../components/Cell";
import Compass from "../components/compass";
import Zoom from "../components/zoom";
import MiniMap from "../components/MiniMap";
import MsgBar from "../components/msgBar";
import Info from "../components/Info";
export default {
  name: 'Home',
  components: {
    Info,
    MsgBar,
    MiniMap,
    Zoom,
    Compass,
    Cell
  },
  computed:{
    grid (){
      return this.$store.state.grid
    }
  },
  methods:{
    sendMessage(e){
      console.log(e);
      this.$store.dispatch('sendMessage',e)
    }
  },
  mounted() {
    const store = this.$store;
    document.addEventListener("keydown", function(event) {
    //console.log(event.key);
      if (document.activeElement.tagName==="INPUT"){
        return;
      }
     if(event.key==="ArrowUp" || event.key==="w") {
       event.preventDefault();
       store.dispatch('moveUserUp');
     }
     else if(event.key==="ArrowDown" || event.key==="s") {
       event.preventDefault();
        store.dispatch('moveUserDown');
      }
     else if(event.key==="ArrowLeft" || event.key==="a") {
       event.preventDefault();
       store.dispatch('moveUserLeft');
     }
     else if(event.key==="ArrowRight" || event.key==="d") {
       event.preventDefault();
       store.dispatch('moveUserRight');
     }
    });
  },
  destroyed() {
    document.removeEventListener("keydown",function(event) {
      //console.log(event.key);
      if (document.activeElement.tagName==="INPUT"){
        return;
      }
      if(event.key==="ArrowUp" || event.key==="W") {
        event.preventDefault();
        store.dispatch('moveUserUp');
      }
      else if(event.key==="ArrowDown" || event.key==="S") {
        event.preventDefault();
        store.dispatch('moveUserDown');
      }
      else if(event.key==="ArrowLeft" || event.key==="A") {
        event.preventDefault();
        store.dispatch('moveUserLeft');
      }
      else if(event.key==="ArrowRight" || event.key==="D") {
        event.preventDefault();
        store.dispatch('moveUserRight');
      }
    })
  }

}
</script>
