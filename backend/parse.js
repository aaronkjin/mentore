const { database } = require('./firebase.js');
const { ref, set } = require('firebase/database');
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
  data.forEach((item, index) => {
    const itemRef = ref(database, 'bios/' + Date.now());
    set(itemRef, item)
      .then(() => console.log(`Item ${index} written to database successfully.`))
      .catch(error => console.error('Error writing item to database:', error));
  });
}

readCSVAndWriteToFirebase('output.csv');