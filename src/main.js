import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {auth,  usersRef} from './firebase/firebase'
import './firebase/presence'
import VueContext from 'vue-context';
Vue.component('vue-context',VueContext);
import LongPress from 'vue-directive-long-press'
Vue.use(require('vue-moment'));
Vue.directive('long-press', LongPress)

import * as firebase from "firebase";
/*import smoothscroll from 'smoothscroll-polyfill';
//this doesnt work
// kick off the polyfill!
smoothscroll.polyfill();*/
import { library } from '@fortawesome/fontawesome-svg-core'
import { faPaperPlane, faCog, faInfo,faPlus,faHome,faBars,faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faPaperPlane);
library.add(faCog);
library.add(faInfo);library.add(faPlus);library.add(faHome);library.add(faTimes);library.add(faBars)
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

