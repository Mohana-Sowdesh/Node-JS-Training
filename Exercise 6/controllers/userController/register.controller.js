const fileAccess = require('../../services/fileAccess');
const filePath = "../../data/tasks.json";
const errLogger = require('../../utils/logger');

const registerUser = (req,res) => {
    res.send("Message from registerUser controller");
};

module.exports = {registerUser};