// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import "firebase/storage";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDjpAjET-Cg1JwHx51Y4gzlMuLWTjOTSno",
    authDomain: "closet-store-52cc2.firebaseapp.com",
    projectId: "closet-store-52cc2",
    storageBucket: "closet-store-52cc2.appspot.com",
    messagingSenderId: "116376873363",
    appId: "1:116376873363:web:3e1444b3bf02529858a066"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage_bucket = getStorage(app);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider()
export const firestore = getFirestore(app);