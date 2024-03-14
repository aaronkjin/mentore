const { initializeApp } = require('firebase/app');
const { getFirestore, collection, addDoc } = require('firebase/firestore');

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
const firestore = getFirestore(app);

const fs = require('fs');
const Papa = require('papaparse');

function readCSVAndWriteToFirebase(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf8');

  Papa.parse(fileContent, {
    header: true,
    complete: function(results) {
      writeToFirebase(results.data);
    }
  });
}

function writeToFirebase(data) {
  data.forEach(async (item, index) => {
    // Add a new document with a generated id in the 'bios' collection
    const collectionRef = collection(firestore, 'bios');
    if(item.Bio == 'Less') {
      item.Bio = 'not available'
    }
    try {
      const docRef = await addDoc(collectionRef, item);
      console.log(`Item ${index} written to Firestore with ID: ${docRef.id}`);
    } catch (error) {
      console.error('Error writing item to Firestore:', error);
    }
  });
}

readCSVAndWriteToFirebase('new_mentore_data.csv');