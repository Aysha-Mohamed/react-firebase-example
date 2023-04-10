// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyA5qlHExipTvwcM8DIlTOrNGDfz2RQj2BY",
  authDomain: "fir-project-2a8cb.firebaseapp.com",
  projectId: "fir-project-2a8cb",
  storageBucket: "fir-project-2a8cb.appspot.com",
  messagingSenderId: "574915904230",
  appId: "1:574915904230:web:8144cd5c7056d67cf53127",
  measurementId: "G-BCZZG0Z6JS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();


export const db = getFirestore(app);
export const storage = getStorage(app);