import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCyh5dvYuyCE_WpK6JkELJC3noq-6Eokeo",
    authDomain: "mentore-f10eb.firebaseapp.com",
    databaseURL: "https://mentore-f10eb-default-rtdb.firebaseio.com",
    projectId: "mentore-f10eb",
    storageBucket: "mentore-f10eb.appspot.com",
    messagingSenderId: "4871333699",
    appId: "1:4871333699:web:312f5934ffeb6aee63b1f6",
    measurementId: "G-CY44SD596W"
  };

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth = getAuth(app);