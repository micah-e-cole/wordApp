/*
 MB
 06/15/23
 Purpose: to converty CSV file elements into array
 for use by the word-guessing game
 File: ./helpers/fileReader.js
*/

const fs = require('fs');

/*
Takes in a CSV file's contents (csvFP) and maps
each value as an element within a new array
*/
function readFileContents(fp) {
  const fileContent = fs.readFileSync(fp, 'utf-8');
  const rows = fileContent.split('\n');
  const csvData = rows.map(row => row.split(','));
  return csvData;
}

// location of CSV file
const csvFP = './random.csv';
// creating a new array to hold contents
const contents = readFileContents(csvFP);
// print new array
console.log(contents);