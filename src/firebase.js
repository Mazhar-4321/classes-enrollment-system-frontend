import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAEMSNMcube8zqA9jOiahN42p8DXuvIZXw",
  authDomain: "facctum-3b872.firebaseapp.com",
  projectId: "facctum-3b872",
  storageBucket: "facctum-3b872.appspot.com",
  messagingSenderId: "814458158895",
  appId: "1:814458158895:web:6c5ba67658bfd3b6f4abda",
  measurementId: "G-VLTK8EQMKF"
};

// Initialize Firebase
console.log(process.env.MAZHAR)
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app)
