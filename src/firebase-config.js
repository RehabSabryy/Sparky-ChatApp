// Import the functions from the SDKs
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


//  web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjbej7gdgP1kkBPrqNWQVyz2domuhMNWw",
  authDomain: "chatting-system-89b98.firebaseapp.com",
  projectId: "chatting-system-89b98",
  storageBucket: "chatting-system-89b98.appspot.com",
  messagingSenderId: "974036041843",
  appId: "1:974036041843:web:3f38e76278a93a44b5ea06",
  measurementId: "G-D4HGRN053Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
// Initialize Firestore and get a reference to the service
const db = getFirestore(app);
export { db };
