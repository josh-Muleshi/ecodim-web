import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "TA_CLE_API",
  authDomain: "TON_PROJET.firebaseapp.com",
  projectId: "TON_PROJECT_ID",
  storageBucket: "TON_PROJECT.appspot.com",
  messagingSenderId: "TON_SENDER_ID",
  appId: "TON_APP_ID",
};

// Initialisation de Firebase
const app = initializeApp(firebaseConfig);

// Initialisation de l'authentification Firebase
export const auth = getAuth(app);
export const db = getFirestore(app);

