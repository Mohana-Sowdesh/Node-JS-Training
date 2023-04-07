const fileAccess = require('../../helpers/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');
const service = require('../../services/taskServices/createTask.service');

const createTaskController = (req,res) => {

    //Check if a same task is present
    //Check if all data are valid

    service.createTask();
    res.send("Message from create task");
};

module.exports = {createTaskController};