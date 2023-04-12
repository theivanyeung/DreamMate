import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyD4rpfc9MEvr96lL-HJ6J7Qubv4lxRfZw0",
  authDomain: "dreammate-b3ce5.firebaseapp.com",
  projectId: "dreammate-b3ce5",
  storageBucket: "dreammate-b3ce5.appspot.com",
  messagingSenderId: "158988281321",
  appId: "1:158988281321:web:1a80463b086471277bd778",
  measurementId: "G-RPNYZ46LE3",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// FIRESTORE EXPORTS
export const firestore = firebase.firestore();

// STORAGE EXPORTS
export const storage = firebase.storage();
