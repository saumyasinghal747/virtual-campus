<template>
  <div id="app" class="row" >
    <div class="col-3  bg-gunn" style="">
      <h1  class="mx-3 text-light my-5"><img height="50rem" class="pr-2 mb-2" src="https://resources.finalsite.net/images/f_auto,q_auto/v1574549382/pausdorg/qo9sgse4olm17gzfydud/henrygunn-hs.png"/>Gunn Campus</h1>
      <div class="nav mx-3 flex-column nav-pills" id="v-pills-tab" role="tablist" aria-orientation="vertical">
        <router-link class="nav-link" to="/">Home</router-link>
        <router-link class="nav-link" to="/settings">Settings</router-link>
        <router-link class="nav-link" to="/about">About</router-link>

     </div>
    </div>
    <div  class="col-9 bg-black p-1" style="width: 100%;overflow: scroll;height: 100vh">
      <router-view/>
    </div>

  </div>
</template>

<style>

@import url(https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css);
@import "../public/colors.css";
  #app {
    height:100vh;
    width: 100%;
    margin: 0 !important;
  }
:root{
  --black: #000;
  --gunn: #a61616;
}
  .nav-pills .nav-link {
    color:var(--light);
    margin-bottom:0.5rem
  }
  .nav-pills .nav-link.router-link-exact-active{
    background-color: var(--light);
    color: var(--gunn)
  }

.nav-pills .nav-link:hover:not(.router-link-exact-active){
    background-color: rgba(255, 255, 255, 0.3);
    
  }

  .bg-black{
    background-color: var(--black);
  }
</style>
