import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {auth,  usersRef} from './firebase/firebase'
import * as firebase from "firebase";
/*import smoothscroll from 'smoothscroll-polyfill';
//this doesnt work
// kick off the polyfill!
smoothscroll.polyfill();*/
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faPaperPlane)
// Install BootstrapVue
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false


let app;
auth.onAuthStateChanged((user) => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }

})

