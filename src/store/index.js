import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import 'firebase/auth'
import 'firebase/database'
import {auth, gridRef, usersRef} from "../firebase/firebase";
const apiBase = 'https://mangoice.herokuapp.com/campus'
Vue.use(Vuex)

function getRndInteger(min, max) { //could be useful for the coins...
  return Math.floor(Math.random() * (max - min) ) + min;
}
Array.prototype.remove = function() {
  var what, a = arguments, L = a.length, ax;
  while (L && this.length) {
    what = a[--L];
    while ((ax = this.indexOf(what)) !== -1) {
      this.splice(ax, 1);
    }
  }
  return this;
};
var store;
export default store = new Vuex.Store({
  state: {
    token:null,
    userProfile: {uid: null, photoURL:null, displayName: null, email:null},
    elimination:{
      username:null,
      target:null,
      score:null
    },
    grid:[],
    users: {},
    zoomLevels: [
      {cellSize:'20vh',uSize:'2.5em',uBadge:true,padding:'p-3',people:true}, //0
      {cellSize:'15vh',uSize:'2em',uBadge:true,padding:'p-2',people:true},//1
      {cellSize:'10vh',uSize:'1.2em',uBadge:false,padding: 'p-1',people:true},//2
      {cellSize:'5vh',people:false},//3
      {cellSize:'2vh',people:false}//4
    ],
    zoom:0
  },
  mutations: {
    setEliminationUser(state,username){
      state.elimination.username=username
    },
    increaseZoom(state){
      //actually subtracting one
      if(state.zoom!==0){
        state.zoom--
      }
    },
    decreaseZoom(state){
      //actually subtracting one
      if(state.zoom!==4){
        state.zoom++
      }
    },
    async updateUserLocation(state, direction) {
      const token = state.token;
      const response = await fetch(`${apiBase}/${direction}/${token}`,{
        method:'POST'
      })
      const {newLocation:{0:x, 1:y}} = await response.json();

      document.querySelector('.home').childNodes[y].childNodes[x].scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
    },
    async setToken(state){
      state.token = await auth.currentUser.getIdToken()
    },
    setGrid(state, grid) {
      state.grid = grid
    },
    setProfile(state,payload){
      state.userProfile = payload; //yeah that's about it .. access everything else from users.
      // Use users to access the grid.

    },
    setUsers(state,users){
      //console.log("I'm doing it")
      state.users = users
    }
  },
  actions: {
    async moveUserUp(context) {
      context.commit('updateUserLocation','up')
    },
    async moveUserDown({state, commit}) {
      commit('updateUserLocation','down')
    },
    async moveUserLeft({state, commit}) {
      commit('updateUserLocation','left')
    },
    async moveUserRight({state, commit}) {
      commit('updateUserLocation','right')
    },
    moveNowhere(context){
      const target = context.state.users[context.state.userProfile.uid]
      const currLoc = target.location;
      document.querySelector('.home').childNodes[currLoc[1]].childNodes[currLoc[0]].scrollIntoView({behavior: "smooth", block: "center", inline: "center"})

    },
    async fetchUserProfile({commit}, user, token) {
      // fetch user profile - this is called when the user has just signed in.




      // change route to home
      await router.push('/app')
    },
    sendMessage(context,msg){
      const target = context.state.users[context.state.userProfile.uid]
      const currLoc = target.location;
      gridRef.child(currLoc[1]+'/'+currLoc[0]+'/people/'+context.state.userProfile.uid).update({
        saying:{
          message:msg,
          since:new Date()
        }
      })
    }
  },
  modules: {},
  getters:{
    userLocation(state){
      usersRef.child(auth.currentUser.uid).once('value',function(snapshot){
        location = (snapshot.val()||{location:null}).location;
        //if the user has a saved location, use that
          return location

      })

    },
    zoomInfo(state){
      return state.zoomLevels[state.zoom]
    },
    distanceTo: (state) => (payload)=>{
      const currLoc = (state.users[state.userProfile.uid]||{location:false}).location;
      if (!currLoc){
        return 4
      }
      const b= ((currLoc[0]-payload.x)**2)+(currLoc[1]-payload.y)**2
      //console.log(currLoc);
      return Math.sqrt(b)
    }
  }

});


//on snapshot goes here, update the state.grid whenever you see this.
gridRef.on('value',function(snapshot){
  store.commit('setGrid',snapshot.val())
})
usersRef.on('value',function(snapshot){
  //console.log(snapshot.val()[auth.currentUser.uid])
  // todo: this is pointless, but for some reason it doesn't draw ME until we do this
  store.commit('setUsers',snapshot.val())
})
// on auth state changed, update the user profile.
auth.onAuthStateChanged(function(user){
  if (user){
    store.commit('setToken');
    if (user.email.split('@')[1]!=='pausd.us' && user.email !=='saumyasmathtutoring@pausd.us'){
      console.log("Not PAUSD!!")
      user.delete()
      return null;
    }

    else {//get the saved location and log it to the console
      //user just signed in
      console.log(user.displayName);
      store.commit('setProfile', user);

      let location;
      usersRef.child(user.uid).once('value', function (snapshot) {
        location = (snapshot.val() || {location: null}).location;
        if (location) { //if the user has a saved location, use that
          console.log("Using saved location:" + location)
          /*store.commit({
            type:'updateUserLocation',
            x: location[0], y:location[1]
          })*/
        } else { //otherwise place them somewhere random on the grid.
          //const x = 3//70//getRndInteger(0,100);
          //const y = 3//65//getRndInteger(0,70);
          console.log("Placing randomly at" + [3,3])
          store.commit('updateUserLocation','up')// reset to 3,3 happens automatically
          location = [3,3];
        }
        try {
          document.querySelector('.home').childNodes[location[1]].childNodes[location[0]].scrollIntoView({
            behavior: 'smooth', block: 'center', inline: 'center'
          })
        }
        catch (e) {
          console.log("your wifi is slow man")
        }
      })
    }

  }
  else{
    store.commit('setProfile',{uid:null})

  }
})
