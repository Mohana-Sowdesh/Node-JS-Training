const fileAccess = require('../../helpers/fileAccess');
const filePath = "../../data/tasks.json";
const {errLogger, infoLogger} = require('../../utils/logger');
const service = require('../../services/taskServices/readTasks.service');

const readTasksController = (req,res) => {
   //Check if there are tasks and not empty
   infoLogger.info(`BEGIN: readTasks service started`);
   service.readTasks();
   infoLogger.info(`END: readTasks service ended`);
   res.send("Message from read tasks");
};

module.exports = {readTasksController};