const fileAccess = require('../../helpers/fileAccess');
const filePath = "../../data/tasks.json";
const {errLogger, infoLogger} = require('../../utils/logger');
const service = require('../../services/taskServices/sortTask.service');

const sortTaskController = (req,res) => {
    infoLogger.info(`BEGIN: sortTask service started`);
    service.sortTask();
    infoLogger.info(`END: sortTask service ended`);
    res.send("Message from sort task");
};

module.exports = {sortTaskController};