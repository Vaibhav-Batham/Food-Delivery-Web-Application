// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";



// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "tastico-food-deliver.firebaseapp.com",
  projectId: "tastico-food-deliver",
  storageBucket: "tastico-food-deliver.firebasestorage.app",
  messagingSenderId: "577789762964",
  appId: "1:577789762964:web:6899e0fbe301c3bc5e0381"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
export {app,auth}