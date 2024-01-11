const filePath = "data/tasks.json";
const fileAccess = require('../../helpers/fileAccess');
const APP_CONSTANTS = require('../../helpers/appConstants');

/**
 * Service to add taskDetails for the user and write it to tasks file
 * @param {*} username 
 * @param {*} taskDetail 
 */
const createTask = (req) => {
    try {
        fileAccessResponse = fileAccess.readFromFile(filePath);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return APP_CONSTANTS.ERROR;
    }

    fileAccessResponse = JSON.parse(fileAccessResponse);
    userTasks = fileAccessResponse[req.username];
    userTasks.push(req.body);
    
    try {
        fileAccess.writeToFile(filePath, fileAccessResponse);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return APP_CONSTANTS.ERROR;
    }
}

module.exports = {createTask};