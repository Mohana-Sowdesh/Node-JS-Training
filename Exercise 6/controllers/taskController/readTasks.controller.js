const fileAccess = require('../../helpers/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');
const service = require('../../services/taskServices/readTasks.service');

const readTasksController = (req,res) => {
   //Check if there are tasks and not empty

   service.readTasks();
   res.send("Message from read tasks");
};

module.exports = {readTasksController};