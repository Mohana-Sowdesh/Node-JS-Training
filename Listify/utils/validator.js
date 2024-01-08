const CONSTANTS = require('../helpers/constant');

/**
 * Method to validate the username given by a new user while registration
 * @param {*} username 
 * @returns 
 */
const userNameValidator = (username) => {
    if((/^[a-zA-Z_]{1,30}$/).test(username) == false)
        return false;
    return true;
}

/**
 * Method to validate the password given by a new user while registration
 * @param {*} password 
 * @returns 
 */
const passwordValidator = (password) => {
    if((/^[a-zA-Z0-9\W]{8,}$/).test(password) == false)
        return false;
    return true;
}

module.exports = { userNameValidator, passwordValidator }