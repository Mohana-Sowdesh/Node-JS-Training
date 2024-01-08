const fileAccess = require('../../helpers/fileAccess');
const filePath = "../../data/tasks.json";
const {errLogger, infoLogger} = require('../../utils/logger');
const service = require('../../services/taskServices/updateTask.service');

const updateTaskController = (req,res) => {

    //Check if the task ID is present
    infoLogger.info(`BEGIN: updateTask service started`);
    service.updateTask();
    infoLogger.info(`END: updateTask service ended`);
    res.send("Message from update task");
};

module.exports = {updateTaskController};