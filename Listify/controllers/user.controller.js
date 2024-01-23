const fileAccess = require('../helpers/fileAccess');
const {errLogger, infoLogger} = require('../utils/logger');
const service = require('../services/user.service');
const CONSTANTS = require('../helpers/constants'); 
const responseObj = require('../utils/responseObj');
const resp = require('../helpers/response');
const validator = require('../utils/validator');
const userHelper = require('../helpers/userHelper');
const bcrypt = require("bcrypt");
const APP_CONSTANTS = require('../helpers/appConstants');
let response;

/**
 * Controller to login a user
 * @param {*} req 
 * @param {*} res 
 */
const loginController = async (req,res) => {
    keyExistsValidationResult = validator.userKeysValidator(req.body);

    if(keyExistsValidationResult.length > 0) {
        response = responseObj.httpErrorObj(keyExistsValidationResult, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res,response);
    }

    try {
        //Reading users.json file
        fileAccessResponse = fileAccess.readFromFile(__dirname + APP_CONSTANTS.USERS_FILE_PATH);
        content = JSON.parse(fileAccessResponse);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res, response);
    }

    //Fetching username and password from body
    let username = req.body.username;
    let password = req.body.password;

    try {
        //Creating token
        infoLogger.info(`BEGIN: User login service started`);
        token = await service.login(content, username, password);
        infoLogger.info(`END: User login service ended`);
        if(token == '') {
            response = responseObj.httpErrorObj(CONSTANTS.LOGIN.LOGIN_ERROR, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        }
        else {
            response = responseObj.httpSuccessObj({ "token": token});
        }
        return resp.sendResponse(res, response);
    }
    catch(err) {
        //Logging error
        errLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res, response);
    }
};

/**
 * Controller to register a new user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const registerController = async (req, res) => {
    keyExistsValidationResult = validator.userKeysValidator(req.body);

    if(keyExistsValidationResult.length > 0) {
        response = responseObj.httpErrorObj(keyExistsValidationResult, CONSTANTS.STATUS_CODES.BAD_REQUEST);
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
    const usersFileData = fileAccess.readFromFile(__dirname + APP_CONSTANTS.USERS_FILE_PATH);
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
        errLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        response = responseObj.httpErrorObj(CONSTANTS.REGISTER.REGISTRATION_FAILURE, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res,response);
    }

    response = responseObj.httpSuccessObj(req.body);
    return resp.sendResponse(res,response);
};

module.exports = { loginController, registerController };