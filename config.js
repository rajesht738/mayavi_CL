import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { getStorage } from "firebase/compat/storage";

// firebase configuration

export const firebaseConfig = {
 
  };
//  firebase.firestore().settings({ experimentalForceLongPolling: true });
let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.initializeApp(firebaseConfig);
}
app.firestore().settings({ experimentalForceLongPolling: true ,merge: true});  
          
const db= app.firestore();
// const db = app.firestore();
const auth = firebase.auth();
const storage = app.storage();

const fs = firebase.firestore()
// console.log(auth);
export { firebase, db, auth, storage,fs};
