const fileAccess = require('../../helpers/fileAccess');
const usersFilePath = "data/users.json";
const {errLogger, infoLogger} = require('../../utils/logger');
const service = require('../../services/userServices/login.service');
const CONSTANTS = require('../../helpers/constant'); 
const responseObj = require('../../utils/responseObj');
const resp = require('../../helpers/response');
let response;

/**
 * Controller to login a user
 * @param {*} req 
 * @param {*} res 
 */
const loginController = async (req,res) => {
    //Reading useers.json file
    fileAccessResponse = fileAccess.readFromFile(usersFilePath);
    content = JSON.parse(fileAccessResponse);

    //Fetching username and password from body
    let username = req.body.username;
    let password = req.body.password;

    try {
        //Creating token
        infoLogger.info(`BEGIN: User login service started`);
        token = await service.login(content, username, password);
        infoLogger.info(`END: User login service ended`);
        if(token == '') {
            response = responseObj.httpErrorObj(req, CONSTANTS.LOGIN.LOGIN_ERROR, CONSTANTS.STATUS_CODES.BAD_REQUEST);
            return resp.sendResponse(res, response);
        }
        else {
            response = responseObj.httpSuccessObj({ "token": token});
            return resp.sendResponse(res, response);
        }
    }
    catch(err) {
        //Logging error
        errLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        response = responseObj.httpErrorObj(req, CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res, response);
    }
};

module.exports = {loginController};