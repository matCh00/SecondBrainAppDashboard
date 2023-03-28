import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDBhFYI3oLDpzEbTHO859Z5PfJpmlMnwkg",
  authDomain: "secondbrain-bb8b2.firebaseapp.com",
  projectId: "secondbrain-bb8b2",
  storageBucket: "secondbrain-bb8b2.appspot.com",
  messagingSenderId: "347230904715",
  appId: "1:347230904715:web:6fd9251bdac34c4e7d8f8e",
  measurementId: "G-R8NNEE4S78"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const storage = getStorage(app);