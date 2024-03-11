const firebase = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

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

  const app = firebase.initializeApp(firebaseConfig);
  const database = getDatabase(app);

  module.exports = { database };