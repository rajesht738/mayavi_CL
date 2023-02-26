import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/compat/storage";

// firebase configuration

export const firebaseConfig = {
 
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
