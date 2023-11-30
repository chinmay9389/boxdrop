// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  projectId: "boxdrop-72892",
  storageBucket: "boxdrop-72892.appspot.com",
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};

// Initialize Firebase
console.log(process.env.projectId);
// console.log(getApps().length);
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
// console.log(app);
// console.log(getApps().length);
const db = getFirestore(app);
// console.log(db);
const storgae = getStorage(app);
// console.log(storgae);

export { db, storgae };
