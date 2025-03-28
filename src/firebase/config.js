import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAm_bYxKAoRZuxMFfQ5mTua-8g2mfmjnA4",
  authDomain: "mini-blog-879c5.firebaseapp.com",
  projectId: "mini-blog-879c5",
  storageBucket: "mini-blog-879c5.firebasestorage.app",
  messagingSenderId: "546246597527",
  appId: "1:546246597527:web:e779d6c6df6c54fa6e42d2",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, app };
