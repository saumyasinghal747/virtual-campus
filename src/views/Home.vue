<template>
  <div class="home"  style="overflow: scroll;white-space: nowrap;opacity: 0.7">
    <div  style="overflow: visible;white-space: nowrap;flex-wrap: nowrap;" v-for="i in grid" class="text-nowrap row">
      <div style="white-space: normal; display: inline-block;" v-for="j in i" ><Cell :people="j.people" :variant="j.type"  /></div>
    </div>
<Compass/>
    <zoom/>

  </div>
</template>

<script>
// @ is an alias to /src
import Cell from "@/components/Cell";
import Compass from "../components/compass";
import Zoom from "../components/zoom";
import MiniMap from "../components/MiniMap";
export default {
  name: 'Home',
  components: {
    MiniMap,
    Zoom,
    Compass,
    Cell
  },
  computed:{
    grid (){
      return this.$store.state.grid
    }
  }

}
</script>
