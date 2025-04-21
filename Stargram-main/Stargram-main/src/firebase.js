import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Autenticación
import { getFirestore } from "firebase/firestore"; // Firestore
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBjkQr0Y5eexhgv0cZ-cFvmzrNmNegIZx8",
  authDomain: "stargrammuro-77b9f.firebaseapp.com",
  projectId: "stargrammuro-77b9f",
  storageBucket: "stargrammuro-77b9f.appspot.com",
  messagingSenderId: "334495946289",
  appId: "1:334495946289:web:dc9aeeee3d7c499b0ca710"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app); 
const db = getFirestore(app); 
const storage = getStorage(app); 

export { auth, db, storage };
