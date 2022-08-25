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

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const storage = getStorage();
const auth = getAuth();
export default app;
export { storage, auth };
