// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5n6N_tEHDFZxKy7tnMO9zA-8lg-M-YFs",
  authDomain: "boxdrop-72892.firebaseapp.com",
  projectId: "boxdrop-72892",
  storageBucket: "boxdrop-72892.appspot.com",
  messagingSenderId: "405313917721",
  appId: "1:405313917721:web:f25896be8477ba0f112b88",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const storgae = getStorage(app);

export { db, storgae };
