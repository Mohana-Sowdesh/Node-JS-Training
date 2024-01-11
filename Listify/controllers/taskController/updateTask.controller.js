const {infoLogger} = require('../../utils/logger');
const service = require('../../services/taskServices/updateTask.service');
const responseObj = require('../../utils/responseObj');
const resp = require('../../helpers/response');
const validator = require('../../utils/validator');
const taskHelper = require('../../helpers/taskHelper');
const CONSTANTS = require('../../helpers/constants');
const APP_CONSTANTS = require('../../helpers/appConstants');

/**
 * Controller to update an existing task based on the taskId received as path param
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const updateTaskController = (req,res) => {
    // Validating the taskId
    taskIdValidationResult = validator.taskIdValidator(req.params.id);

    if(!taskIdValidationResult) {
        response = responseObj.httpErrorObj(CONSTANTS.READ_TASK_BY_ID.TASK_ID_INVALID, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res,response);
    }

    // Checks if the taskId exists or not
    ifTasksExistsResult = taskHelper.taskExists(req, req.params.id);

    if(ifTasksExistsResult == -2) {
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res,response);
    }
    else if(ifTasksExistsResult == -1) {
        response = responseObj.httpErrorObj(CONSTANTS.UPDATE_TASK.TASK_NOT_FOUND, CONSTANTS.STATUS_CODES.NOT_FOUND);
        return resp.sendResponse(res,response);
    }

    // Checking if the taskId in req params and req body matches or not
    if(req.params.id != req.body.taskId) {
        response = responseObj.httpErrorObj(CONSTANTS.UPDATE_TASK.TASK_ID_NOT_MATCH, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res,response);
    }

    // Validating the keys of req body
    validationResult = validator.taskValidator(req.body);

    if(!validationResult.flag){
        response = responseObj.httpErrorObj(validationResult.messages, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res, response);
    }

    infoLogger.info(`BEGIN: updateTask service started`);
    updationResult = service.updateTask(req);
    infoLogger.info(`END: updateTask service ended`);

    if(updationResult == APP_CONSTANTS.FILE_READ_WRITE_ERROR_CODE) {
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
    else if(updationResult == APP_CONSTANTS.SUCCESS_CODE) {
        response = responseObj.httpSuccessObj(CONSTANTS.UPDATE_TASK.UPDATION_SUCCESS);
    }
    return resp.sendResponse(res, response);
};

module.exports = {updateTaskController};