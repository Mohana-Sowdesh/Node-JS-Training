const fileAccess = require('../../services/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');

const filterTask = (req,res) => {
    res.send("Message from filterTask controller");
};

module.exports = {filterTask};