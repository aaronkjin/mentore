const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");

require("dotenv").config();

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.FIREBASE_DATABASE_URL,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

const fs = require("fs");
const Papa = require("papaparse");

function readCSVAndWriteToFirebase(filePath) {
  const fileContent = fs.readFileSync(filePath, "utf8");

  Papa.parse(fileContent, {
    header: true,
    complete: function (results) {
      writeToFirebase(results.data);
    },
  });
}

function writeToFirebase(data) {
  data.forEach(async (item, index) => {
    // Add a new document with a generated id in the 'bios' collection
    const collectionRef = collection(firestore, "bios");
    if (item.Bio == "Less") {
      item.Bio = "not available";
    }
    try {
      const docRef = await addDoc(collectionRef, item);
      console.log(`Item ${index} written to Firestore with ID: ${docRef.id}`);
    } catch (error) {
      console.error("Error writing item to Firestore:", error);
    }
  });
}

readCSVAndWriteToFirebase("new_mentore_data.csv");
