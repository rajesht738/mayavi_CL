import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/compat/storage";

// firebase configuration

export const firebaseConfig = {
  apiKey: "AIzaSyB1fzZa-BCgDbZ_2ErcHTiVkKQ6bTD66Qk",
  authDomain: "mayacl-54f4c.firebaseapp.com",
  projectId: "mayacl-54f4c",
  storageBucket: "mayacl-54f4c.appspot.com",
  messagingSenderId: "53613889333",
  appId: "1:53613889333:web:77fb34e369748b7414ae7c",
  };

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.initializeApp(firebaseConfig);
}

const db = app.firestore();
const auth = firebase.auth();
const storage = app.storage();

const fb = firebase.app()
// console.log(auth);
export { firebase, db, auth, storage,fb};
