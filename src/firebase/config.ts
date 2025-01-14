import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  // Your Firebase configuration object
  // You'll get this from your Firebase Console
  apiKey: "AIzaSyBG_he6LS-qRm-4TwNb5V3nJZ5rvQLbjv4",
  authDomain: "muskanbirthday-6fb4d.firebaseapp.com",
  databaseURL:
    "https://muskanbirthday-6fb4d-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "muskanbirthday-6fb4d",
  storageBucket: "muskanbirthday-6fb4d.firebasestorage.app",
  messagingSenderId: "896697369619",
  appId: "1:896697369619:web:a0db9ea6efaa0f62fc2be6",
  measurementId: "G-M153G4HCBX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
