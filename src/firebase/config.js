// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCJ0PRhgwO-sGVDS9soKRQS6ZsMrAxAz4",
  authDomain: "twitter-clone-app-e0a4f.firebaseapp.com",
  projectId: "twitter-clone-app-e0a4f",
  storageBucket: "twitter-clone-app-e0a4f.appspot.com",
  messagingSenderId: "213067180908",
  appId: "1:213067180908:web:40153d3ee74e77beb46149",
  measurementId: "G-JD56VPLVLK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get auth method
export const auth = getAuth(app);

// Google provider
export const provider = new GoogleAuthProvider();

// data base
export const db = getFirestore(app);

// media store

export const storage =getStorage(app);