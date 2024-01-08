const fileAccess = require('../../helpers/fileAccess');
const filePath = "../../data/tasks.json";
const {errLogger, infoLogger} = require('../../utils/logger');
const service = require('../../services/taskServices/filterTask.service');

const filterTaskController = (req,res) => {
    infoLogger.info(`BEGIN: filterTask service started`);
    service.filterTask();
    infoLogger.info(`END: filterTask service ended`);
    res.send("Message from filter task");

};

module.exports = {filterTaskController};