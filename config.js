import * as firebase from 'firebase';
require ('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyBUnzabHqoIlqtajBshkHoT4RWgY-td0xg",
    authDomain: "c-71firestore.firebaseapp.com",
    projectId: "c-71firestore",
    storageBucket: "c-71firestore.appspot.com",
    messagingSenderId: "566969170565",
    appId: "1:566969170565:web:261d505ca6224c054087ec"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore();