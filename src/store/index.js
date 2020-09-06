import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { usersRef} from "../firebase/firebase";
Vue.use(Vuex)


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

export default new Vuex.Store({
  state: {
    userProfile: {
      uid: 'uid1' //for testing, i'll set some random uid
    },
    grid:[ //rows of columns - it's exactly as it looks. [y][x] gets you the right cell.
        [
            {people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
        ],
      [
        {people:[],type:'road'},{people:[],type:'science'},{people:[],type:'science'},{people:[],type:'science'},{people:[],type:'science'},{people:[],type:'science'},{people:[],type:'science'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'road'},{people:[],type:'science'},{people:[{username:'Saumya Singhal', uid:'uid1'},{username:'Ada Lovelace', uid:'uid2'}],type:'science'},{people:[],type:'science'},{people:[],type:'science'},{people:[],type:'science'},{people:[],type:'science'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'road'},{people:[],type:'science'},{people:[],type:'science'},{people:[],type:'science'},{people:[],type:'science'},{people:[],type:'science'},{people:[],type:'science'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'language'},{people:[],type:'language'},{people:[],type:'language'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'language'},{people:[],type:'language'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'grass'},{people:[],type:'grass'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'language'},{people:[],type:'language'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'language'},{people:[],type:'language'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'grass'},{people:[],type:'grass'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
       ],
        [
          {people:[],type:'language'},{people:[],type:'language'},{people:[],type:'road'},{people:[],type:'language'},{people:[],type:'language'},{people:[],type:'road'},{people:[],type:'language'},{people:[],type:'language'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'computers'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
        ],
      [
        {people:[],type:'language'},{people:[],type:'language'},{people:[],type:'road'},{people:[],type:'language'},{people:[],type:'language'},{people:[],type:'road'},{people:[],type:'language'},{people:[],type:'language'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'language'},{people:[],type:'language'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'language'},{people:[],type:'language'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'language'},{people:[],type:'language'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'language'},{people:[],type:'language'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'other'},{people:[],type:'other'},{people:[],type:'other'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'other'},{people:[],type:'other'},{people:[],type:'other'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'other'},{people:[],type:'other'},{people:[],type:'other'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'other'},{people:[],type:'other'},{people:[],type:'other'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'other'},{people:[],type:'other'},{people:[],type:'other'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'other'},{people:[],type:'other'},{people:[],type:'other'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'other'},{people:[],type:'other'},{people:[],type:'other'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'road'}
      ],
      [
        {people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'history'},{people:[],type:'history'},{people:[],type:'road'}
      ],
        [
          {people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
        ],
      [
        {people:[],type:'util'},{people:[],type:'util'},{people:[],type:'util'},{people:[],type:'road'},{people:[],type:'road'},{people:[],type:'road'}
      ]

    ],
    users:{
      'uid1':{
        username: "Saumya Singhal",
        location:[2,2]
      },
      'uid2':{
        username: "Ada Lovelace",
        location:[2,2] //this is x,y format
      }
    }
  },
  mutations: {
    updateUserLocation(state, payload){
      const target = state.users[state.userProfile.uid]
      const currLoc = target.location;
      const name = target.username;
      state.grid[currLoc[1]][currLoc[0]].people=state.grid[currLoc[1]][currLoc[0]].people.filter(function (value, index, arr) {
        return value.uid !== state.userProfile.uid
      });
      state.grid[payload.y][payload.x].people.push({
        username:name,
        uid:state.userProfile.uid
      })
      state.users[state.userProfile.uid].location=[payload.x,payload.y]
    }
  },
  actions: {
     moveUserUp({state,dispatch,commit}){
       const target = state.users[state.userProfile.uid]
       const currLoc = target.location;
        commit({
          type:'updateUserLocation',
          x:currLoc[0],
          y:currLoc[1]-1
        })
    },
    moveUserDown({state,commit}){
      const target = state.users[state.userProfile.uid]
      const currLoc = target.location;
      commit({
        type:'updateUserLocation',
        x:currLoc[0],
        y:currLoc[1]+1
      })
    },
    moveUserLeft({state,commit}){
      const target = state.users[state.userProfile.uid]
      const currLoc = target.location;
      commit({
        type:'updateUserLocation',
        x:currLoc[0]-1,
        y:currLoc[1]
      })
    },
    moveUserRight({state,commit}){
      const target = state.users[state.userProfile.uid]
      const currLoc = target.location;
      commit({
        type:'updateUserLocation',
        x:currLoc[0]+1,
        y:currLoc[1]
      })
    },
    async fetchUserProfile({ commit }, user, token) {
      // fetch user profile
      let load = {};
      load[user.uid] ={
        lastLogin: firebase.database.ServerValue.TIMESTAMP
      }
      await usersRef.update(load)
    // change route to home
      await router.push('/')
    }
  },
  modules: {
  }
})


//on snapshot goes here, update the state whenever you see this.