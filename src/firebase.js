import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBwctGeyjtTrtY7nYPiq-_vnNs4N-qSlLg",
    authDomain: "ftc-competition-a62ed.firebaseapp.com",
    projectId: "ftc-competition-a62ed",
    storageBucket: "ftc-competition-a62ed.appspot.com",
    messagingSenderId: "69336596634",
    appId: "1:69336596634:web:a45717305465e52c855f23",
    measurementId: "G-CJMJ4Z5XBP"
  };


  firebase.initializeApp(firebaseConfig)
  export default firebase; 