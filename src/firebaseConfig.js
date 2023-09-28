// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5lp17cwMDQL_XU-gLMSB_TsnwWo6C3PM",
  authDomain: "jamesons-site.firebaseapp.com",
  projectId: "jamesons-site",
  storageBucket: "jamesons-site.appspot.com",
  messagingSenderId: "395380378511",
  appId: "1:395380378511:web:730962d61d1f35b10219fa",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
