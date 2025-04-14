import { initializeApp } from "firebase/app";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyChpDiOBdRu4U4aFeB-I5tWrF3ySovA6WU",
  authDomain: "mybookmarks-a1dfa.firebaseapp.com",
  projectId: "mybookmarks-a1dfa",
  storageBucket: "mybookmarks-a1dfa.firebasestorage.app",
  messagingSenderId: "97666717942",
  appId: "1:97666717942:web:f5650982b3aa29371bb4d7",
  measurementId: "G-7182399PSZ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
