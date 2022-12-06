// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIYhFJnt2Ad3efy0-iHYN2BhEiVQw0QgU",
  authDomain: "n3ckfleeks.firebaseapp.com",
  projectId: "n3ckfleeks",
  storageBucket: "n3ckfleeks.appspot.com",
  messagingSenderId: "917122658973",
  appId: "1:917122658973:web:b44ca00980e4cd39601a74",
  measurementId: "G-CBJRY8M0VB",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();
// const analytics = getAnalytics(app);

export default app;
export { auth, db };
