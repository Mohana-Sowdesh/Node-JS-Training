const fileAccess = require('../../services/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');

const readTaskByID = (req,res) => {
    res.send("Message from readTaskByID controller");
};

module.exports = {readTaskByID};