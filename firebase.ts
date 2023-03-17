import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDS_XfnBZyx7b1K1_NlBvd5M2A7KObRV3Y",
  authDomain: "filmpire-16af8.firebaseapp.com",
  projectId: "filmpire-16af8",
  storageBucket: "filmpire-16af8.appspot.com",
  messagingSenderId: "385377526796",
  appId: "1:385377526796:web:6eb121474dcd8b8b0fba29",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
