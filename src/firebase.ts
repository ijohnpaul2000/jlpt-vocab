// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAHHdl3UkPKpkEvr9-P0GZQYiQzK4w3jg",
  authDomain: "jlpt-vocab-5b939.firebaseapp.com",
  projectId: "jlpt-vocab-5b939",
  storageBucket: "jlpt-vocab-5b939.appspot.com",
  messagingSenderId: "638835298277",
  appId: "1:638835298277:web:c03667fb30cf36ddae690c",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

const db = getFirestore(app);

export const auth = getAuth(app);

export default db;
