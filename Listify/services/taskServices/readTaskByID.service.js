const {errLogger} = require('../../utils/logger');
const fileAccess = require('../../helpers/fileAccess');
let tasksFilePath = '/../../data/tasks.json';

/**
 * Service to read a task of a particular user by taskID
 * @param {*} req 
 * @param {*} incomingTaskId 
 * @returns 
 */
const readTaskByID = (req, incomingTaskId) => {
    let result = { exists: -1, data: {} };
    try {
        //Reading tasks.json file
        fileAccessResponse = fileAccess.readFromFile(__dirname + tasksFilePath);
        allTasks = JSON.parse(fileAccessResponse);
        userTasks = allTasks[req.username];
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        result.exists = -2;
    }

    for(let i=0; i < userTasks.length; i++) {
        if(userTasks[i].taskId === incomingTaskId) {
            result.exists = i;
            result.data = userTasks[i];
            break;
        }
    }
    return result;
}

module.exports = {readTaskByID};