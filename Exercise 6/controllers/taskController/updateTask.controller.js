const fileAccess = require('../../helpers/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');
const service = require('../../services/taskServices/updateTask.service');

const updateTaskController = (req,res) => {

    //Check if the task ID is present
    
    service.updateTask();
    res.send("Message from update task");
};

module.exports = {updateTaskController};