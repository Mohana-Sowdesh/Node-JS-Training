const { infoLogger} = require('../../utils/logger');
const service = require('../../services/taskServices/sortTask.service');
const validator = require('../../utils/validator');
const CONSTANTS = require('../../helpers/constants');
const responseObj = require('../../utils/responseObj');
const resp = require('../../helpers/response');
const APP_CONSTANTS = require('../../helpers/appConstants');
const taskHelper = require('../../helpers/taskHelper');

/**
 * Controller to sort tasks based on title/ priority/ dueDate in asc or desc order
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const sortTaskController = (req,res) => {
    validationResult = validator.filterTaskValidator(req.query);
    validationResult = validator.sortValueValidator(req.query, validationResult);

    if(!validationResult.flag) {
        response = responseObj.httpErrorObj(validationResult.messages, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res, response);
    }

    infoLogger.info(`BEGIN: sortTask service started`);
    result = service.sortTask(req);
    infoLogger.info(`END: sortTask service ended`);

    if(result.code == APP_CONSTANTS.FILE_READ_WRITE_ERROR_CODE) {
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res, response);
    }
    else if(result.data.length == 0) {
        response = responseObj.httpSuccessObj(CONSTANTS.FILTER_TASK.NO_DATA_FOUND);
        return resp.sendResponse(res, response);
    }
    else {
        response = responseObj.httpSuccessObj(result.data);
    }

    if(req.query.offset || req.query.limit) {
        paginationValidationResult = validator.paginationKeyValidator(req.query);

        if(!paginationValidationResult.flag) {
            response = responseObj.httpErrorObj(paginationValidationResult.messages, CONSTANTS.STATUS_CODES.BAD_REQUEST);
            return resp.sendResponse(res, response);
        }
        paginatedResult = taskHelper.paginateResults(req.query, result.data);
        response = responseObj.httpSuccessObj(paginatedResult);
    }
    return resp.sendResponse(res, response);
};

module.exports = {sortTaskController};