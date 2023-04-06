const fileAccess = require('../../services/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');

const sortTask = (req,res) => {
    res.send("Message from sortTask controller");
};

module.exports = {sortTask};