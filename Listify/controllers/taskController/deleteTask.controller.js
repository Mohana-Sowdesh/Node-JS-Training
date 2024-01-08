const fileAccess = require('../../helpers/fileAccess');
const filePath = "../../data/tasks.json";
const {errLogger, infoLogger} = require('../../utils/logger');
const service = require('../../services/taskServices/deleteTask.service');

const deleteTaskController = (req,res) => {

    //Check if the task ID is present
    infoLogger.info(`BEGIN: deleteTask service started`);
    service.deleteTask();
    infoLogger.info(`END: deleteTask service ended`);
    res.send("Message from delete task");
};

module.exports = {deleteTaskController};