import {auth, usersRef, firebase, db} from "./firebase";
import IdleJs from 'idle-js'
let oRef;
let testRef;
const idle = new IdleJs({
    idle: 10000, // idle time in ms
    events: ['mousemove', 'keydown', 'mousedown', 'touchstart'], // events that will trigger the idle resetter
    onIdle: function () {
        testRef.set({
            status:"idle"
        })
    }, // callback function to be executed after idle time
    onActive: function () {
        testRef.set({
            status:"online"
        })
    }, // callback function to be executed after back form idleness
    onHide: function () {
        testRef.set({
            status:"idle"
        })
    }, // callback function to be executed when window become hidden
    onShow: function () {
        testRef.set({
            status:"online"
        })
    }, // callback function to be executed when window become visible
    keepTracking: true, // set it to false if you want to be notified only on the first idleness change
    startAtIdle: false // set it to true if you want to start in the idle state
})
auth.onAuthStateChanged(function (user) {
    if(user){
        idle.start();
        console.log("I exist.")
        oRef = db.ref('.info/connected');
        testRef = db.ref('users/'+auth.currentUser.uid+'/presence');
        oRef.on('value', function (snapshot) {
            if (snapshot.val()){
                testRef.onDisconnect().update({
                    status: "offline",
                    lastSeen: firebase.database.ServerValue.TIMESTAMP
                });
                testRef.set({
                    status:"online"
                })
            }
        })

    }
    else {
        try {

            idle.pause();
        }
        catch (e) {

            console.log("not logged in")
        }
    }

})

