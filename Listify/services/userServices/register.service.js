const fileAccess = require('../../helpers/fileAccess');
const usersFilePath = 'data/users.json';
var fileAccessResponse = "";
var content; 

/**
 * Service to register a new user
 * @param {*} username 
 * @param {*} password 
 */
const register = (username, password) => {
    //Reading users.json file
    fileAccessResponse = fileAccess.readFromFile(usersFilePath);
    content = JSON.parse(fileAccessResponse);

    //Appending new user to 'content' array
    content.push({username, password});

    //Writing to users.json file
    fileAccess.writeToFile(usersFilePath, content);
}

module.exports = {register};