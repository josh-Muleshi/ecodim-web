import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD_MwSsCeJpZOGmBSZ-nqQk5Cq0MtR7r7Q",
  authDomain: "ecodim-b3dd0.firebaseapp.com",
  projectId: "ecodim-b3dd0",
  storageBucket: "ecodim-b3dd0.appspot.com",
  messagingSenderId: "52205911313",
  appId: "1:52205911313:web:3f9fd1df02c7f457a220b0",
  measurementId: "G-M6BB6PQSHQ"
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de l'authentification Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);
