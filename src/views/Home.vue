<template>
  <div class="home" @keyup.right="x+=1" @keyup.left="x-=1" @keyup.up="y-=1"  style="overflow: scroll;white-space: nowrap;opacity: 0.7">
    <div  style="overflow: visible;white-space: nowrap;flex-wrap: nowrap;" v-for="i in Array(50).fill().map((_, i) => i )" class="text-nowrap row">
      <div style="white-space: normal; display: inline-block;" v-for="j in Array(50).fill().map((_, i) => i )" ><Cell :class="i==y &&j==x ? 'bg-warning':(i<10&&j<10? 'bg-gunn':'bg-grass')"  /></div>
    </div>
<Compas/>
  </div>
</template>

<script>
// @ is an alias to /src
import Cell from "@/components/Cell";

export default {
  name: 'Home',
  components: {
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
