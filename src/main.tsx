import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import "./custom.css";
import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { api } from "./redux/api";

// Import the functions you need from the SDKs you need
import * as firebase from "firebase/app";
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

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <ApiProvider api={api}>
    <App />
  </ApiProvider>
);
