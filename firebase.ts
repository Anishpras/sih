// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCnSGfjOBdzY-g2Pto63o7-67XCeE3hglM",
  authDomain: "sih-hackathon-ef0ae.firebaseapp.com",
  projectId: "sih-hackathon-ef0ae",
  storageBucket: "sih-hackathon-ef0ae.appspot.com",
  messagingSenderId: "1000081938674",
  appId: "1:1000081938674:web:29ec3df376ff639467986b",
};

// Firebase Prod

// const firebaseConfig = {
//   apiKey: "AIzaSyCAKL2q8uxpr4Ep9jVomMmj8M5ea615DhA",
//   authDomain: "sih-prod.firebaseapp.com",
//   projectId: "sih-prod",
//   storageBucket: "sih-prod.appspot.com",
//   messagingSenderId: "822060026466",
//   appId: "1:822060026466:web:4c91acf26c3d8d34b7df3b"
// };


// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage();
const auth = getAuth();
export default app;
export { storage, auth };
