const fileAccess = require('../../helpers/fileAccess');
const usersFilePath = 'data/users.json';
const APP_CONSTANTS = require('../../helpers/appConstants');
const { errLogger } = require('../../utils/logger');
var fileAccessResponse = "";
var content; 

/**
 * Service to register a new user
 * @param {*} username 
 * @param {*} password 
 */
const register = (username, password) => {
    try {
        //Reading users.json file
        fileAccessResponse = fileAccess.readFromFile(usersFilePath);
        content = JSON.parse(fileAccessResponse);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message}`);
        return APP_CONSTANTS.FILE_READ_WRITE_ERROR_CODE;
    }

    //Appending new user to 'content' array
    content.push({username, password});

    try {
        //Writing to users.json file
        fileAccess.writeToFile(usersFilePath, content);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message}`);
        return APP_CONSTANTS.FILE_READ_WRITE_ERROR_CODE;
    }
    return APP_CONSTANTS.SUCCESS_CODE;
}

module.exports = {register};