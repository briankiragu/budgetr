import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDiSLlaaKpRDaGXn9DdKRzGil2cISPZq8k",
  authDomain: "budgetr-ui.firebaseapp.com",
  projectId: "budgetr-ui",
  storageBucket: "budgetr-ui.appspot.com",
  messagingSenderId: "916363734569",
  appId: "1:916363734569:web:f2f92bd1ca6d5d03ad3638",
  measurementId: "G-P3VLGR4Z5T",
};

// Initialize Firebase.
const app = initializeApp(firebaseConfig);
getAnalytics(app);

// Initialise Firebase services...
export const db = getFirestore(app);

export default app;
