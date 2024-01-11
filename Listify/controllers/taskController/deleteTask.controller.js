const {infoLogger} = require('../../utils/logger');
const validator = require('../../utils/validator');
const service = require('../../services/taskServices/deleteTask.service');
const CONSTANTS = require('../../helpers/constants');
const responseObj = require('../../utils/responseObj');
const resp = require('../../helpers/response');

/**
 * Controller to delete a task by taskId
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const deleteTaskController = (req,res) => {
    taskIdValidationResult = validator.taskIdValidator(req.params.id);

    if(!taskIdValidationResult) {
        response = responseObj.httpErrorObj(CONSTANTS.READ_TASK_BY_ID.TASK_ID_INVALID, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res,response);
    }

    //Check if the task ID is present
    infoLogger.info(`BEGIN: deleteTask service started`);
    taskDeletionResult = service.deleteTask(req, req.params.id);
    infoLogger.info(`END: deleteTask service ended`);

    if(taskDeletionResult == -1) {
        response = responseObj.httpErrorObj(CONSTANTS.DELETE_TASK.TASK_NOT_FOUND, CONSTANTS.STATUS_CODES.NOT_FOUND);
    }
    else if(taskDeletionResult == 1) {
        response = responseObj.httpSuccessObj(CONSTANTS.DELETE_TASK.DELETION_SUCCESS);
    }
    else {
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
    }
    return resp.sendResponse(res,response);
};

module.exports = {deleteTaskController};