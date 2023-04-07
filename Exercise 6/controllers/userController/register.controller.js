const fileAccess = require('../../helpers/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');
const service = require('../../services/userServices/register.service');

const registerController = (req,res) => {
    service.register();
    res.send("Message from register user");
};

module.exports = {registerController};