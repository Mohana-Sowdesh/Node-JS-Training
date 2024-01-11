const {infoLogger} = require('../../utils/logger');
const service = require('../../services/taskServices/createTask.service');
const APP_CONSTANTS = require('../../helpers/appConstants');
const CONSTANTS = require('../../helpers/constants');
const responseObj = require('../../utils/responseObj');
const resp = require('../../helpers/response');
const validator = require('../../utils/validator');
const taskHelper = require('../../helpers/taskHelper');

/**
 * Controller to create a new task
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createTaskController = (req,res) => {
    let response;

    validationResult = validator.taskValidator(req.body);

    if(!validationResult.flag){
        response = responseObj.httpErrorObj(validationResult.messages, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res, response);
    }
    ifTaskExists = taskHelper.taskExists(req, req.body.taskId);

    if(ifTaskExists == 1) {
        response = responseObj.httpErrorObj(CONSTANTS.CREATE_TASK.TASK_ALREADY_EXISTS, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res, response);
    }
    else if(ifTaskExists == -2) {
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res, response);
    }

    infoLogger.info(`BEGIN: createTask service started`);
    result = service.createTask(req);
    infoLogger.info(`END: createTask service ended`);

    if(result == APP_CONSTANTS.ERROR) {
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
    else {
        response = responseObj.httpSuccessObj(CONSTANTS.CREATE_TASK.TASK_CREATED);
    }
    return resp.sendResponse(res, response);
};

module.exports = {createTaskController};