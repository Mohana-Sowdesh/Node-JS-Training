const fileAccess = require('../../services/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');

const loginUser = (req,res) => {
    res.send("Message from loginUser controller");
};

module.exports = {loginUser};