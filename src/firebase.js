// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app"
import {getFirestore} from "firebase/firestore"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCtYmM5bcIZ-6e7wUYeRWbxWJV-R2KirJg",
  authDomain: "posts-40077.firebaseapp.com",
  projectId: "posts-40077",
  storageBucket: "posts-40077.appspot.com",
  messagingSenderId: "322489602956",
  appId: "1:322489602956:web:38beeabeff0c06d429fca9"
};

// Initialize Firebase
let app;
if (firebase.getApps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else{
    app = firebase.getApp()
}

const database = getFirestore()
const storage = getStorage()
export {database, storage}