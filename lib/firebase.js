import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseCredentials = {
  apiKey: "AIzaSyDW72GFWJqzVdpGuRjhhXg-u8cFjf7kYcE",  
  authDomain: "ogs-two.firebaseapp.com",
  projectId: "ogs-two",
  storageBucket: "ogs-two.appspot.com",
  messagingSenderId: "946211354585",
  appId: "1:946211354585:web:6e28751c143cbcb6478bc8",
  measurementId: "G-2MQJB9T3BH"
};

let app;
let db;
let storage;

if (!firebase.apps.length) {
  app = firebase.initializeApp(firebaseCredentials);
}

db = firebase.firestore();
storage = firebase.storage();

export { firebase, app, db, storage };

