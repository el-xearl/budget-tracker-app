// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBqYPc4ROJRAu1wxvsJpqmFz6NbCnGKsls",
    authDomain: "budget-tracker-app-bdc4f.firebaseapp.com",
    projectId: "budget-tracker-app-bdc4f",
    storageBucket: "budget-tracker-app-bdc4f.firebasestorage.app",
    messagingSenderId: "988567124783",
    appId: "1:988567124783:web:e433b57242875acb543fda"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);