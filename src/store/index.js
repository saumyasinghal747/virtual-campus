import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import 'firebase/auth'
import 'firebase/database'
import {auth, gridRef, usersRef} from "../firebase/firebase";

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
    userProfile: {
      uid: null //for testing, i'll set some random uid
    },
    grid: //paste below :D
        []
    ,users: {

    },
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
    updateUserLocation(state, payload) {

      const target = auth.currentUser.uid //find out who is logged in for which we need to change the location
      if (!target){
        return;
      }
      let currLoc;
      usersRef.child(target).once('value',function(snapshot){
        currLoc = snapshot.val().location;
        if (!currLoc){
          return;
        }

        else{
          // access the row then the cell. We'll be storing data differently - the object uid:{username}
          gridRef.child(currLoc[1]+'/'+currLoc[0]+'/people/'+target).set(null)
        }
      })





      gridRef.child(payload.y+'/'+payload.x+'/people/'+target).set({
        username:auth.currentUser.displayName,
        photo: auth.currentUser.photoURL
      })
      //denormalize
      //state.users[state.userProfile.uid].location = [payload.x, payload.y]
      usersRef.child(target).update({
        location:[payload.x,payload.y]
      })
      document.querySelector('.home').childNodes[payload.y].childNodes[payload.x].scrollIntoView({behavior: "smooth", block: "center", inline: "center"})
    },
    setGrid(state, grid) {
      state.grid = grid
    },
    setProfile(state,payload){
      state.userProfile.uid = payload.uid; //yeah that's about it .. access everything else from users.
      // Use users to access the grid.

    },
    setUsers(state,users){
      //console.log("I'm doing it")
      state.users = users
    }
  },
  actions: {
    moveUserUp(context) {
      const target = context.state.users[context.state.userProfile.uid]
      const currLoc = target.location;
      if (currLoc[1]===0){
        return;
      }
      else {
        context.commit({
          type: 'updateUserLocation',
          x: currLoc[0],
          y: currLoc[1] - 1
        })
      }
    },
    moveUserDown({state, commit}) {
      const target = state.users[state.userProfile.uid]
      const currLoc = target.location;
      if (currLoc[1]===69){
        return;
      }
      else {
        commit({
          type: 'updateUserLocation',
          x: currLoc[0],
          y: currLoc[1] + 1
        })
      }
    },
    moveUserLeft({state, commit}) {
      const target = state.users[state.userProfile.uid]
      const currLoc = target.location;
      if (currLoc[0]===0){
        return;
      }
      else {
        commit({
          type: 'updateUserLocation',
          x: currLoc[0] - 1,
          y: currLoc[1]
        })
      }
    },
    moveUserRight({state, commit}) {
      const target = state.users[state.userProfile.uid]
      const currLoc = target.location;
      if (currLoc[0]===99){
        return;
      }
      else {
        commit({
          type: 'updateUserLocation',
          x: currLoc[0] + 1,
          y: currLoc[1]
        })
      }
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
      const currLoc = state.users[state.userProfile.uid].location;
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
    if (user.email.split('@')[1]!=='pausd.us' && user.email !=='saumyasmathtutoring@pausd.us'){
      console.log("Not PAUSD!!")
      user.delete()
      return;
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
          const x = 3//70//getRndInteger(0,100);
          const y = 3//65//getRndInteger(0,70);
          console.log("Placing randomly at" + [x, y])
          store.commit({
            type: 'updateUserLocation',
            x, y
          })
          location = [x, y];
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
