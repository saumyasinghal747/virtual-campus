import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

// firebase init - add your own config here
const firebaseConfig = {
    apiKey: "AIzaSyCL3_AgVhmoUf2mBgB-qt3SjKeLwf0J5iY",
    authDomain: "gunnwebapp.firebaseapp.com",
    databaseURL: "https://gunnwebapp.firebaseio.com",
    projectId: "gunnwebapp",
    storageBucket: "gunnwebapp.appspot.com",
    messagingSenderId: "175691721563",
    appId: "1:175691721563:web:a024e47fe806265f06887e",
    measurementId: "G-QFH27J81KP"
};
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.database()
const auth = firebase.auth()
export var provider = new firebase.auth.GoogleAuthProvider();

provider.addScope('profile');
provider.addScope('email');
const usersRef = db.ref('/users')
const roomsRef = db.ref('/rooms')

// export utils/refs
export {
    db,
    auth,
    usersRef,
    roomsRef,
    firebase
}