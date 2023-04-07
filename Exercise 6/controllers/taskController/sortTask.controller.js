const fileAccess = require('../../helpers/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');
const service = require('../../services/taskServices/sortTask.service');

const sortTaskController = (req,res) => {
    service.sortTask();
    res.send("Message from sort task");
};

module.exports = {sortTaskController};