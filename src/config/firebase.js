// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDwltwpvHSCnHYr2Tpj9nIFZh7aqFRvPbE",
  authDomain: "fir-project-dd013.firebaseapp.com",
  databaseURL: "https://fir-project-dd013-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-project-dd013",
  storageBucket: "fir-project-dd013.appspot.com",
  messagingSenderId: "149944648638",
  appId: "1:149944648638:web:b8fed18a7c23040057efef",
  measurementId: "G-ZMKQTT4S39"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);