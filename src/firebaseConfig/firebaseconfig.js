import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


//  Configuracion de la web app de firebase
const firebaseConfig = {
  apiKey: "AIzaSyB4Kj3aMdXMxS9l1m4om91aJBWQgf3ZnXg",
  authDomain: "todo-b14a5.firebaseapp.com",
  projectId: "todo-b14a5",
  storageBucket: "todo-b14a5.appspot.com",
  messagingSenderId: "830872344672",
  appId: "1:830872344672:web:31a234fef15dac6fc3cb05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);