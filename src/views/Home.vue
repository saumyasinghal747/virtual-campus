<template>
  <div class="home"  style="overflow: scroll;white-space: nowrap;opacity: 0.7">
    <div  style="overflow: visible;white-space: nowrap;flex-wrap: nowrap;" v-for="i in Array(5).fill().map((_, i) => i )" class="text-nowrap row">
      <div style="white-space: normal; display: inline-block;" v-for="j in Array(5).fill().map((_, i) => i )" ><Cell :people="i==y &&j==x ? [{username:'Saumya Singhal'}]:undefined" :class="(i<10&&j<10? 'bg-gunn':'bg-grass')"  /></div>
    </div>
<Compass/>
  </div>
</template>

<script>
// @ is an alias to /src
import Cell from "@/components/Cell";
import Compass from "../components/compass";

export default {
  name: 'Home',
  components: {
    Compass,
    Cell
  },
  data(){
    return {
      x:1,
      y:3
    }
  }

}
</script>
