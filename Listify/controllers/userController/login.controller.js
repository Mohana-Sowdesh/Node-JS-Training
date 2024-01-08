const fileAccess = require('../../helpers/fileAccess');
const usersFilePath = "data/users.json";
const {errLogger, infoLogger} = require('../../utils/logger');
const service = require('../../services/userServices/login.service');
const messages = require('../../helpers/constant'); 

const loginController = (req,res) => {
    //Reading useers.json file
    fileAccessResponse = fileAccess.readFromFile(usersFilePath);
    content = JSON.parse(fileAccessResponse);

    //Fetching username and password from body
    let username = req.body.username;
    let password = req.body.password;

    try {
        //Creating token
        infoLogger.info(`BEGIN: User login service started`);
        token = service.login(content, username, password);
        infoLogger.info(`END: User login service ended`);
        res.status(200).send({message: messages.loginSuccess, token:token});
    }
    catch(err) {
        //Logging error
        errLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send(messages.loginError);
    }
};

module.exports = {loginController};