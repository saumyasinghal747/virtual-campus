(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"4c93":function(t,n,e){t.exports=e.p+"img/btn_google_signin_dark_pressed_web@2x.75a7cb04.png"},"64ff":function(t,n,e){},a1ad:function(t,n,e){t.exports=e.p+"img/btn_google_signin_dark_normal_web@2x.56f00e35.png"},a55b:function(t,n,e){"use strict";e.r(n);var o=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("div",{staticClass:"container mt-5 text-light"},[e("h1",[t._v("Please log in.")]),e("h4",[t._v("Remember to use your PAUSD account!")]),e("img",{staticClass:"mt-5 ",attrs:{id:"gButton",src:t.gButton,alt:"Sign in with Google"},on:{mouseout:t.toggleButton,mouseenter:t.toggleButton,click:t.signIn}})])},s=[],i=e("5124"),a=e("a1ad"),c=e("4c93"),u=e("4360"),r={name:"Login",data(){return{gButton:a}},store:u["a"],methods:{toggleButton:function(){this.gButton=this.gButton==a?c:a},signIn:function(){i["a"].signInWithPopup(i["b"]).then(t=>{var n=t.credential.accessToken,e=t.user;console.log(e.email);const o=e.email.split("@")[1];if("pausd.us"!==o)return console.log("Not PAUSD!"),void e.delete();this.$store.dispatch("fetchUserProfile",{user:e,token:n})})}}},g=r,l=(e("cc43"),e("2877")),f=Object(l["a"])(g,o,s,!1,null,"5ffa2b1b",null);n["default"]=f.exports},cc43:function(t,n,e){"use strict";var o=e("64ff"),s=e.n(o);s.a}}]);
//# sourceMappingURL=login.d7b8b235.js.map