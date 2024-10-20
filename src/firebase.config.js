// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
require('dotenv').config();
const APIKEY = process.env.firebase_API_KEY;
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: "jobsync-6e749.firebaseapp.com",
  projectId: "jobsync-6e749",
  storageBucket: "jobsync-6e749.appspot.com",
  messagingSenderId: "473707641478",
  appId: "1:473707641478:web:378f1d4b0aeec626f72f07",
  measurementId: "G-R9MSLVYLQE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

