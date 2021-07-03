import firebase from "firebase";

const config = {
    apiKey: "AIzaSyDYXoN5P8tAaw6C-kjg4AmIEKaZSfdA5Z0",
    authDomain: "mattay-ni.firebaseapp.com",
    projectId: "mattay-ni",
    storageBucket: "mattay-ni.appspot.com",
    messagingSenderId: "129702775067",
    appId: "1:129702775067:web:e62c7fce8c4bbc1a80abbe"
  };

const db = !firebase.apps.length
    ? firebase.initializeApp(config).firestore()
    : firebase.app().firestore();

export default db;