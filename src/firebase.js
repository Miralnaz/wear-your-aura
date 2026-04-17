import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Ye data aapko Firebase Console se milega
const firebaseConfig = {
  apiKey: "AIzaSy...", 
  authDomain: "wear-your-aura.firebaseapp.com",
  projectId: "wear-your-aura",
  storageBucket: "wear-your-aura.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:12345:web:abc"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);