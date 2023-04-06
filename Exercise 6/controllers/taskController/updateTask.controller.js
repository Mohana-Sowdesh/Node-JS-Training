const fileAccess = require('../../services/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');

const updateTask = (req,res) => {
    res.send("Message from updateTask controller");
};

module.exports = {updateTask};