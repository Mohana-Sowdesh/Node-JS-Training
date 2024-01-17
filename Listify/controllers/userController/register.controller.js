const service = require('../../services/userServices/register.service');
const CONSTANTS = require('../../helpers/constants'); 
const {errLogger, infoLogger} = require('../../utils/logger');
const validator = require('../../utils/validator');
const responseObj = require('../../utils/responseObj');
const resp = require('../../helpers/response');
const userHelper = require('../../helpers/userHelper');
const fileAccess = require('../../helpers/fileAccess');
const bcrypt = require("bcrypt");
const APP_CONSTANTS = require('../../helpers/appConstants');
const TASKS_FILE_PATH = "/../../data/tasks.json";
const USERS_FILE_PATH = "/../../data/users.json";
let response;

/**
 * Controller to register a new user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const registerController = async (req, res) => {
    keyExistsValidationResult = validator.userKeysValidator(req.body);

    if(!keyExistsValidationResult.flag) {
        response = responseObj.httpErrorObj(keyExistsValidationResult.messages, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res,response);
    }

    const userNameValidationRes = validator.userNameValidator(req.body.username);
    const passwordValidationRes = validator.passwordValidator(req.body.password);
    
    if(!userNameValidationRes) {
        response = responseObj.httpErrorObj(CONSTANTS.REGISTER.USERNAME_INVALID, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res,response);
    }
    else if(!passwordValidationRes) {
        response = responseObj.httpErrorObj(CONSTANTS.REGISTER.PASSWORD_INVALID, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res,response);
    }

    // Check if user already exits or not
    const usersFileData = fileAccess.readFromFile(__dirname + USERS_FILE_PATH);
    const userCheckResult = userHelper.userExists(usersFileData, req.body.username);

    if(userCheckResult != -1)
    {
        response = responseObj.httpErrorObj(CONSTANTS.REGISTER.USER_ALREADY_EXISTS, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res,response);
    }

    const generatedSalt = await bcrypt.genSalt(14);
    const hashedPassword = await bcrypt.hash(req.body.password, generatedSalt);

    try {
        //Calling register service function
        infoLogger.info(`BEGIN: User register service started`);
        registrationResult = service.register(req.body.username, hashedPassword);
        infoLogger.info(`END: User register service ended`);
    }
    catch(err) {
        errLogger.error(`${err} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }

    if(registrationResult == APP_CONSTANTS.SUCCESS_CODE) {
        response = responseObj.httpSuccessObj(CONSTANTS.REGISTER.REGISTRATION_SUCCESS);
        //Create a new key in tasks file for the created user
        const tasksFileDataStr = fileAccess.readFromFile(__dirname + TASKS_FILE_PATH);
        const tasksFileData = JSON.parse(tasksFileDataStr);
        tasksFileData[req.body.username] = [];
        fileAccess.writeToFile((__dirname + TASKS_FILE_PATH), tasksFileData);
    }
    else {
        response = responseObj.httpErrorObj(CONSTANTS.REGISTER.REGISTRATION_FAILURE, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
    return resp.sendResponse(res,response);
};

module.exports = {registerController};