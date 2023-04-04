//Importing file system package
let fs = require('fs');

//Generic function to read a file
let readFromFile = (filePath) => {
    let fileData = fs.readFileSync(filePath,'UTF-8');
    return fileData;
}

//Generic function to write to a file
let writeToFile = (filePath, randomFiveColours) => {
    let fileData = fs.writeFileSync(filePath, JSON.stringify(randomFiveColours));
}

module.exports = {readFromFile, writeToFile}