import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASDEVNFdVnJ4vbsup25D3ByKsUwdQGDEA",
  authDomain: "entregafinal-c65e6.firebaseapp.com",
  projectId: "entregafinal-c65e6",
  storageBucket: "entregafinal-c65e6.firebasestorage.app",
  messagingSenderId: "190765191391",
  appId: "1:190765191391:web:45420f441c671b6d4dd96a",
  measurementId: "G-P55N8V4WZB"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);


