const auth = require('../middleware/auth');
const bcrypt = require("bcrypt");
const fileAccess = require('../helpers/fileAccess');
const APP_CONSTANTS = require('../helpers/appConstants');
const { errLogger } = require('../utils/logger');
let fileAccessResponse = "";
let content; 

/**
 * Service to login a user
 * @param {*} content - users file data
 * @param {*} username 
 * @param {*} password 
 * @returns 
 */
const login = async (content, username, password) => {
    let token = undefined, i = 0; 
    for(i=0; i < content.length; i++) {
        if(content[i].username == username) {
            if(await bcrypt.compare(password, content[i].password)) {
                token = auth.createToken(username);
            }
        }
    }

    if(token != undefined) {
        return token;
    }
    else {
        return '';
    }
}

/**
 * Service to register a new user
 * @param {*} username 
 * @param {*} password 
 */
const register = (username, password) => {
    try {
        //Reading users.json file
        fileAccessResponse = fileAccess.readFromFile(__dirname + APP_CONSTANTS.USERS_FILE_PATH);
        content = JSON.parse(fileAccessResponse);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message}`);
        throw new Error(err);
    }

    //Appending new user to 'content' array
    content.push({username, password});

    try {
        //Writing to users.json file
        fileAccess.writeToFile((__dirname + APP_CONSTANTS.USERS_FILE_PATH), content);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message}`);
    }
    return APP_CONSTANTS.SUCCESS_CODE;
}

module.exports = { login, register };