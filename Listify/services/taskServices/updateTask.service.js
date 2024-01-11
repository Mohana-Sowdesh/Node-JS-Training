const filePath = "/../../data/tasks.json";
const fileAccess = require('../../helpers/fileAccess');
const APP_CONSTANTS = require('../../helpers/appConstants');
const taskHelper = require('../../helpers/taskHelper');
const {errLogger} = require('../../utils/logger');

/**
 * Service to update an existing task based on the taskId received as path param
 * @param {*} req 
 * @returns 
 */
const updateTask = (req) => {
    try {
        fileAccessResponse = fileAccess.readFromFile(__dirname + filePath);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return APP_CONSTANTS.FILE_READ_WRITE_ERROR_CODE;
    }

    allTasks = JSON.parse(fileAccessResponse);
    updationTaskIndex = taskHelper.findTaskIndex(req, req.params.id);

    if(updationTaskIndex == -2) {
        return APP_CONSTANTS.FILE_READ_WRITE_ERROR_CODE;
    }
    userTasks = allTasks[req.username];
    // Re-assigning the task with updated details
    userTasks[updationTaskIndex] = req.body;
    allTasks[req.username] = userTasks;
    
    try {
        fileAccess.writeToFile((__dirname + filePath), allTasks);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return APP_CONSTANTS.FILE_READ_WRITE_ERROR_CODE;
    }
    return APP_CONSTANTS.SUCCESS_CODE;
}

module.exports = {updateTask};