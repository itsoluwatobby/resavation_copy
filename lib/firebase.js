import { initializeApp } from "@firebase/app";
import { getStorage } from '@firebase/storage';
import { getFirestore } from '@firebase/firestore';
// import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "resavation-ng.firebaseapp.com",
  projectId: "resavation-ng",
  storageBucket: "resavation-ng.appspot.com",
  messagingSenderId: "144710589748",
  appId: "1:144710589748:web:befb57befdf2e5878e1961",
  measurementId: "G-D1DS8BKT3B",
};

export const app = initializeApp(firebaseConfig);
export const imageStorage = getStorage();
export const usersDB = getFirestore();
