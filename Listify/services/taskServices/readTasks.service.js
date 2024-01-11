const fileAccess = require('../../helpers/fileAccess');
const { errLogger } = require('../../utils/logger');
const filePath = "/../../data/tasks.json";
/**
 * Service to read all tasks for a particular user
 * @returns - list of all tasks for a particular user
 */
const readTasks = (req) => {
    try {
        fileAccessResponse = fileAccess.readFromFile(__dirname + filePath);
        fileAccessResponse = JSON.parse(fileAccessResponse);
        return fileAccessResponse[req.username];
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return null;
    }
}

module.exports = {readTasks};