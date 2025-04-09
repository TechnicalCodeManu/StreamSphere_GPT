// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDGAqhYmltJ2lfyMuf9Y85Wx-qIrOIRhsA",
  authDomain: "streamspheregpt.firebaseapp.com",
  projectId: "streamspheregpt",
  storageBucket: "streamspheregpt.firebasestorage.app",
  messagingSenderId: "115201126320",
  appId: "1:115201126320:web:0235ef95b7eeb8a718b075",
  measurementId: "G-PVHFDNJGHM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);``

export const auth = getAuth();
