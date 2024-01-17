//Importing file system package
let fs = require('fs');

//Generic function to read file
let readFromFile = (filePath) => {
    console.log(filePath);
    let fileData = fs.readFileSync(filePath,'UTF-8');
    return fileData;
}

//Generic function to write to file
let writeToFile = (filePath, content) => {
    console.log(filePath);
    fs.writeFileSync(filePath, JSON.stringify(content));
    return;
}

module.exports = {readFromFile, writeToFile}