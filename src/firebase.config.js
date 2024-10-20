import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
require('dotenv').config();
const apiKey = process.env.Fire_API_KEY;

const firebaseConfig = {
    apiKey: apiKey,
    authDomain: "jobsync-3be06.firebaseapp.com",
    projectId: "jobsync-3be06",
    storageBucket: "jobsync-3be06.appspot.com",
    messagingSenderId: "1091251412290",
    appId: "1:1091251412290:web:5a958f307df74d24917cdb",
    measurementId: "G-H2585G4EZ9"
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
