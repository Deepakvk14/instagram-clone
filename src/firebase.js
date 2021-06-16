import firebase from "firebase"
const firebaseApp = firebase.initializeApp ( {
    apiKey: "AIzaSyDjFb-GfgCb0J4i5SWEqcUnyBSG8oMp3Eg",
    authDomain: "instragram-clone-8ca22.firebaseapp.com",
    projectId: "instragram-clone-8ca22",
    storageBucket: "instragram-clone-8ca22.appspot.com",
    messagingSenderId: "401857726920",
    appId: "1:401857726920:web:aad6e14f8eda89bdfe98fd"
  });
  // Initialize Firebase
  const db = firebaseApp.firestore();
  const auth  = firebase.auth();
  const storage = firebase.storage();
    export default firebaseApp;
  
export {db, auth, storage}