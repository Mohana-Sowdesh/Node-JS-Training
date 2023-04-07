//Importing file system package
let fs = require('fs');

//Generic function to read file
let readFromFile = (filePath) => {
    let fileData = fs.readFileSync(filePath,'UTF-8');
    return fileData;
}

//Generic function to write to file
let writeToFile = (filePath, content) => {
    fs.writeFileSync(filePath, JSON.stringify(content));
}

module.exports = {readFromFile, writeToFile}