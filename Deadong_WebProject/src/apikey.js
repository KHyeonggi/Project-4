import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: 'AIzaSyC8nxzXJNgmMhr9_ggzOi8uUeZBkFaNv7c',
    authDomain: 'deadong-web.firebaseapp.com',
    databaseURL: 'https://deadong-web-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'deadong-web',
    storageBucket: 'deadong-web.firebasestorage.app',
    messagingSenderId: '992177786998',
    appId: '1:992177786998:web:7ea85f37362b1e0e348f57',
    measurementId: 'G-GSYWJM09DX',
}

// Firebase 초기화
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export default firebaseConfig // firebaseConfig를 기본 내보내기로 추가
