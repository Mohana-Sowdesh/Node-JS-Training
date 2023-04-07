const fileAccess = require('../../helpers/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');
const service = require('../../services/taskServices/filterTask.service');

const filterTaskController = (req,res) => {
    service.filterTask();
    res.send("Message from filter task");
};

module.exports = {filterTaskController};