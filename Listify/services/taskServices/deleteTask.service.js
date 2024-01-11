const {errLogger} = require('../../utils/logger');
const fileAccess = require('../../helpers/fileAccess');
let tasksFilePath = '/../../data/tasks.json';

/**
 * Service to delete a task by taskId
 * @param {*} req 
 * @param {*} taskToBeDeleted 
 * @returns 
 */
const deleteTask = (req, taskToBeDeleted) => {
    try {
        //Reading tasks.json file
        fileAccessResponse = fileAccess.readFromFile(__dirname + tasksFilePath);
        allTasks = JSON.parse(fileAccessResponse);
        userTasks = allTasks[req.username];
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return -2;
    }

    for(let i=0; i < userTasks.length; i++) {
        if(userTasks[i].taskId === taskToBeDeleted) {
            userTasks.splice(i, 1);
            allTasks[req.username] = userTasks;
            try {
                fileAccess.writeToFile((__dirname + tasksFilePath), allTasks);
            }
            catch(err) {
                errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
                return -3;
            }
            return 1;
        }
    }
    return -1;
}

module.exports = {deleteTask};