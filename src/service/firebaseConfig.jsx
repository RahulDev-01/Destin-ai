// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAsIdNfw6gXt0K_nMY6XZbVNZkB4tpfLFw",
  authDomain: "ai-travller-planner.firebaseapp.com",
  projectId: "ai-travller-planner",
  storageBucket: "ai-travller-planner.firebasestorage.app",
  messagingSenderId: "676398908616",
  appId: "1:676398908616:web:a985c830775b821ad511fd"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db =getFirestore(app);