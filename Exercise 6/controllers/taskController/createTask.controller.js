const fileAccess = require('../../services/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');

const createTask = (req,res) => {
    res.send("Message from createTask controller");
};

module.exports = {createTask};