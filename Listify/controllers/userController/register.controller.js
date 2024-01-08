const service = require('../../services/userServices/register.service');
const CONSTANTS = require('../../helpers/constant'); 
const {errLogger, infoLogger} = require('../../utils/logger');
const validator = require('../../utils/validator');
const responseObj = require('../../utils/responseObj');
const resp = require('../../helpers/response');
const userHelper = require('../../helpers/userHelper');
const fileAccess = require('../../helpers/fileAccess');
const bcrypt = require("bcrypt");
let flag;
let response;

/**
 * Controller to register a new user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const registerController = async (req, res) => {

    const userNameValidationRes = validator.userNameValidator(req.body.username);
    const passwordValidationRes = validator.passwordValidator(req.body.password);
    
    if(!userNameValidationRes) {
        response = responseObj.httpErrorObj(req, CONSTANTS.REGISTER.USERNAME_INVALID, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res,response);
    }
    else if(!passwordValidationRes) {
        response = responseObj.httpErrorObj(req, CONSTANTS.REGISTER.PASSWORD_INVALID, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res,response);
    }

    // Check if user already exits or not
    const usersFileData = fileAccess.readFromFile(__dirname + "/../../data/users.json");
    const userCheckResult = userHelper.userExists(usersFileData, req.body.username);
    
    if(userCheckResult != -1)
    {
        response = responseObj.httpErrorObj(req, CONSTANTS.REGISTER.USER_ALREADY_EXISTS, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res,response);
    }

    const generatedSalt = await bcrypt.genSalt(14);
    const hashedPassword = await bcrypt.hash(req.body.password, generatedSalt);

    try {
        //Calling register service function
        infoLogger.info(`BEGIN: User register service started`);
        service.register(req.body.username, hashedPassword);
        infoLogger.info(`END: User register service ended`);
        flag = true;
    }
    catch(err) {
        flag = false;
        errLogger.error(`${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        //Logs error in case of error
        response = responseObj.httpErrorObj(req, CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
    }

    if(flag==true) {
        response = responseObj.httpSuccessObj(CONSTANTS.REGISTER.REGISTRATION_SUCCESS);
        //Create a new key in tasks file for the created user
        const tasksFileDataStr = await fileAccess.readFromFile(__dirname + "/../../data/tasks.json");
        const tasksFileData = JSON.parse(tasksFileDataStr);
        tasksFileData[req.body.username] = [];
        await fileAccess.writeToFile((__dirname + "/../../data/tasks.json"), tasksFileData);
        return resp.sendResponse(res,response);
    }
    else {
        response = responseObj.httpErrorObj(req, CONSTANTS.REGISTER.REGISTRATION_FAILURE, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res,response);
    }
};

module.exports = {registerController};