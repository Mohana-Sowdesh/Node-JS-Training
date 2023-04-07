const fileAccess = require('../../helpers/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');
const service = require('../../services/taskServices/readTaskByID.service');

const readTaskByIDController = (req,res) => {

    //Check if the task ID is present

    service.readTaskByID();
    res.send("Message from read task by ID");
};

module.exports = {readTaskByIDController};