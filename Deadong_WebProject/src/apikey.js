// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    VITE_apiKey: "AIzaSyC8nxzXJNgmMhr9_ggzOi8uUeZBkFaNv7c",
    VITE_authDomain: "deadong-web.firebaseapp.com",
    VITE_databaseURL: "https://deadong-web-default-rtdb.asia-southeast1.firebasedatabase.app",
    VITE_projectId: "deadong-web",
    VITE_storageBucket: "deadong-web.firebasestorage.app",
    VITE_messagingSenderId: "992177786998",
    VITE_appId: "1:992177786998:web:7ea85f37362b1e0e348f57",
    VITE_measurementId: "G-GSYWJM09DX"
};


const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);