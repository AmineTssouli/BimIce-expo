// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { 
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,sendPasswordResetEmail
 } from "firebase/auth";
 import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbSxbBToytGhBAMTRKpcfxWNPNQyxkoO0",
  authDomain: "bim-ice.firebaseapp.com",
  projectId: "bim-ice",
  storageBucket: "bim-ice.appspot.com",
  messagingSenderId: "453632687986",
  appId: "1:453632687986:web:b8823ebcca16bbcddb27eb",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);




export default {db,auth, getAuth, onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,sendPasswordResetEmail };