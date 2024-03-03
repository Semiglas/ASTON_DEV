// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiHAcxOTkCnhwebFSmXtG14ufkpJMnkNQ",
  databaseURL: "https://react-aston-default-rtdb.europe-west1.firebasedatabase.app",
  authDomain: "react-aston.firebaseapp.com",
  projectId: "react-aston",
  storageBucket: "react-aston.appspot.com",
  messagingSenderId: "176785448328",
  appId: "1:176785448328:web:3ddbb63256ead85d576e3d",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
export const auth = getAuth(app);
