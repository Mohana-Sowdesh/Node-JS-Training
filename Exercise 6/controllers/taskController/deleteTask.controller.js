const fileAccess = require('../../services/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');

const deleteTask = (req,res) => {
    res.send("Message from deleteTask controller");
};

module.exports = {deleteTask};