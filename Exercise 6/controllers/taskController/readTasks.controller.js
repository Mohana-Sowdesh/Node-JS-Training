const fileAccess = require('../../services/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');

const readTasks = (req,res) => {
    res.send("Message from readTasks controller");
};

module.exports = {readTasks};