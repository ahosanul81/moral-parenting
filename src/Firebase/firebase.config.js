
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDLSTR-9yGB5r1GqOQVU7lPr2QQPjcUga4",
  authDomain: "moral-parenting.firebaseapp.com",
  projectId: "moral-parenting",
  storageBucket: "moral-parenting.appspot.com",
  messagingSenderId: "696233173772",
  appId: "1:696233173772:web:6b6c6dc67a1ef2750cdf29",
  measurementId: "G-3EFY0GL0W5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);