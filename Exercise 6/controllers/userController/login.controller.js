const fileAccess = require('../../helpers/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');
const service = require('../../services/userServices/login.service');

const loginController = (req,res) => {
    service.login();
    res.send("Message from login user");
};

module.exports = {loginController};