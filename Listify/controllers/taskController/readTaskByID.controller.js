const fileAccess = require('../../helpers/fileAccess');
const filePath = "../../data/tasks.json";
const {errLogger, infoLogger} = require('../../utils/logger');
const service = require('../../services/taskServices/readTaskByID.service');

const readTaskByIDController = (req,res) => {

    //Check if the task ID is present
    infoLogger.info(`BEGIN: readTaskByID service started`);
    service.readTaskByID();
    infoLogger.info(`END: readTaskByID service ended`);
    res.send("Message from read task by ID");
};

module.exports = {readTaskByIDController};