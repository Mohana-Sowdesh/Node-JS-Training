const fileAccess = require('../../helpers/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');
const service = require('../../services/taskServices/deleteTask.service');

const deleteTaskController = (req,res) => {

    //Check if the task ID is present
    
    service.deleteTask();
    res.send("Message from delete task");
};

module.exports = {deleteTaskController};