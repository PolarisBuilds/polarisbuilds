import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDyFKrVxkFU5XML__6skIdkvz7rkYO8qpo",
  authDomain: "polaris-builds-89753.firebaseapp.com",
  projectId: "polaris-builds-89753",
  storageBucket: "polaris-builds-89753.appspot.com",
  messagingSenderId: "740987216316",
  appId: "1:740987216316:web:fa69d7212e53034d430bb9",
  measurementId: "G-7JPBQ1TNLB"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
const analytics = isSupported().then(yes => yes ? getAnalytics(app) : null) 