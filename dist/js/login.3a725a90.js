(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["login"],{"4c93":function(t,e,n){t.exports=n.p+"img/btn_google_signin_dark_pressed_web@2x.75a7cb04.png"},a1ad:function(t,e,n){t.exports=n.p+"img/btn_google_signin_dark_normal_web@2x.56f00e35.png"},a55b:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container mt-5 text-light"},[n("h1",[t._v("Please log in.")]),n("h4",[t._v("Remember to use your PAUSD account!")]),n("img",{staticClass:"mt-5 ",attrs:{id:"gButton",src:t.gButton,alt:"Sign in with Google"},on:{mouseout:t.toggleButton,mouseenter:t.toggleButton,click:t.signIn}}),n("b-modal",{attrs:{id:"my-modal"}},[t._v("Sorry, but your email must end in 'pausd.us'. If you're a teacher and are trying to sign in with a 'pausd.org' account, please email "),n("a",{attrs:{href:"mailto:ss44523@pausd.us"}},[t._v("ss44523@pausd.us")]),t._v(" to create a teacher mode.")])],1)},o=[],s=n("5124"),i=n("a1ad"),r=n("4c93"),u=n("4360"),c={name:"Login",data(){return{gButton:i}},store:u["a"],methods:{toggleButton:function(){this.gButton=this.gButton==i?r:i},signIn:function(){s["a"].signInWithPopup(s["c"]).then(t=>{var e=t.credential.accessToken,n=t.user;console.log(n.email);const a=n.email.split("@")[1];if("pausd.us"!==a&&"saumyasmathtutoring@gmail.com"!==n.email)return console.log("Not PAUSD!"),n.delete(),void this.$bvModal.msgBoxOk([this.$createElement("p",{domProps:{innerHTML:"Sorry, but your email must end in 'pausd.us'.<br/><br/> If you're a teacher and are trying to sign in with a 'pausd.org' account, please email <a  href=\"mailto:ss44523@pausd.us\" class=\"text-gunn\">ss44523@pausd.us</a> to create a teacher mode."}})],{centered:!0,title:"PAUSD only!",okVariant:"gunn"});this.$store.dispatch("fetchUserProfile",{user:n,token:e})})}}},l=c,g=(n("c3e6"),n("2877")),d=Object(g["a"])(l,a,o,!1,null,"16398d96",null);e["default"]=d.exports},c3e6:function(t,e,n){"use strict";var a=n("ce43"),o=n.n(a);o.a},ce43:function(t,e,n){}}]);
//# sourceMappingURL=login.3a725a90.js.map