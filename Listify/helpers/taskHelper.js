const {errLogger} = require('../utils/logger');
const fileAccess = require('../helpers/fileAccess');
let tasksFilePath = '/../data/tasks.json';

/**
 * Method to check if the taskId is already present
 * @param {*} req 
 * @param {*} incomingTaskId 
 * @returns 
 */
const taskExists = (req, incomingTaskId) => {
    try {
        //Reading tasks.json file
        fileAccessResponse = fileAccess.readFromFile(__dirname + tasksFilePath);
        allTasks = JSON.parse(fileAccessResponse);
        userTasks = allTasks[req.username];
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return true;
    }

    for(let i=0; i < userTasks.length; i++) {
        if(userTasks[i].taskId === incomingTaskId)
            return true;
    }
    return false;
}

module.exports = { taskExists };