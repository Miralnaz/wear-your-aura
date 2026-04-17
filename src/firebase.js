import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Aapka personal config jo screenshot mein hai
const firebaseConfig = {
  apiKey: "AIzaSyAHTELZ7LOCbn99HLYj6I7FGtySiBQzEcE",
  authDomain: "hn-scents.firebaseapp.com",
  projectId: "hn-scents",
  storageBucket: "hn-scents.firebasestorage.app",
  messagingSenderId: "1003859021492",
  appId: "1:1003859021492:web:b8d07a6be37f791d3f51e1",
  measurementId: "G-5N12ZNEYEF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Database (Firestore) ko export karein taake AdminDashboard use kar sakay
export const db = getFirestore(app);
