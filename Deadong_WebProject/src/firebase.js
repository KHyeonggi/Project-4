// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import config from './apikey'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: config.VITE_apiKey,
    authDomain: config.VITE_authDomain,
    databaseURL: config.VITE_databaseURL,
    projectId: config.VITE_projectId,
    storageBucket: config.VITE_storageBucket,
    messagingSenderId: config.VITE_messagingSenderId,
    appId: config.VITE_appId,
    measurementId: config.VITE_measurementId,
}

// Initialize Firebase

const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
