import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import { usersRef} from "../firebase/firebase";
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userProfile: {},

  },
  mutations: {
  },
  actions: {
    async updateUserLocation({ commit }, x, y){

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


//on snapshot goes here