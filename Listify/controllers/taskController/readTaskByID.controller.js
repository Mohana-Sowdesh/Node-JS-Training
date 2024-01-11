const { infoLogger } = require('../../utils/logger');
const service = require('../../services/taskServices/readTaskByID.service');
const validator = require('../../utils/validator');
const CONSTANTS = require('../../helpers/constants');
const responseObj = require('../../utils/responseObj');
const resp = require('../../helpers/response');

/**
 * Controller to read a task of a particular user by taskID
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const readTaskByIDController = (req,res) => {
    taskIdValidationResult = validator.taskIdValidator(req.params.id);

    if(!taskIdValidationResult) {
        response = responseObj.httpErrorObj(CONSTANTS.READ_TASK_BY_ID.TASK_ID_INVALID, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res,response);
    }

    //Check if the task ID is present
    infoLogger.info(`BEGIN: readTaskByID service started`);
    result = service.readTaskByID(req, req.params.id);
    infoLogger.info(`END: readTaskByID service ended`);

    if(result.exists == -2) {
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
    else if(result.exists == -1) {
        response = responseObj.httpErrorObj(CONSTANTS.READ_TASK_BY_ID.TASK_NOT_FOUND, CONSTANTS.STATUS_CODES.NOT_FOUND);
    }
    else {
        response = responseObj.httpSuccessObj(result.data);
    }
    return resp.sendResponse(res,response);
};

module.exports = {readTaskByIDController};