// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCm418sXo04fLYxzMVz7cYbuxQH1Hart7Y",
  authDomain: "neckfleeks2.firebaseapp.com",
  projectId: "neckfleeks2",
  storageBucket: "neckfleeks2.appspot.com",
  messagingSenderId: "587611085567",
  appId: "1:587611085567:web:d4940cdb70858b19d70aca",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export { auth, db };
export default app;
