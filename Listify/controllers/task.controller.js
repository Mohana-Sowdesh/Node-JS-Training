const {errLogger, infoLogger} = require('../utils/logger');
const service = require('../services/task.service');
const CONSTANTS = require('../helpers/constants');
const responseObj = require('../utils/responseObj');
const resp = require('../helpers/response');
const validator = require('../utils/validator');
const taskHelper = require('../helpers/taskHelper');
const { v4: uuidv4 } = require('uuid');

/**
 * Controller to create a new task
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const createTaskController = (req,res) => {
    let response;

    validationResult = validator.taskValidator(req.body);

    if(validationResult.length > 0){
        response = responseObj.httpErrorObj(validationResult, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res, response);
    }

    taskDetail = req.body;
    taskDetail.taskId = uuidv4();
    taskDetail.createdBy = req.username;
    taskDetail = taskHelper.addTimestampsToComments(taskDetail);

    try {
        infoLogger.info(`BEGIN: createTask service started`);
        result = service.createTask(taskDetail);
        infoLogger.info(`END: createTask service ended`);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res, response);
    }

    response = responseObj.httSuccessMsgObj(CONSTANTS.CREATE_TASK.TASK_CREATED);
    return resp.sendResponse(res, response);
};

/**
 * Controller to read all tasks of a user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const readTasksController = (req,res) => {
    if(req.query?.action == 'filter') {
        return filterTaskController(req, res);
    }
    else if(req.query?.action == 'sort') {
        return sortTaskController(req, res);
    }

    try {
        //Check if there are tasks and not empty
        infoLogger.info(`BEGIN: readTasks service started`);
        allTasks = service.readTasks(req.username);
        infoLogger.info(`END: readTasks service ended`);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res,response);
    }
 
    if(allTasks.length == 0) {
       response = responseObj.httSuccessMsgObj(CONSTANTS.READ_ALL_TASKS.NO_TASKS);
    }
    else {
       result = taskHelper.deleteKeyFromJSON(allTasks, "createdBy");
       response = responseObj.httpSuccessObj(result);
    }
 
    return resp.sendResponse(res,response);
 };

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

    try {
        //Check if the task ID is present
        infoLogger.info(`BEGIN: readTaskByID service started`);
        result = service.readTaskByID(req.username, req.params.id);
        infoLogger.info(`END: readTaskByID service ended`);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res,response);
    }

    if(result.length == 0) {
        response = responseObj.httpErrorObj(CONSTANTS.READ_TASK_BY_ID.TASK_NOT_FOUND, CONSTANTS.STATUS_CODES.NOT_FOUND);
    }
    else {
        result = taskHelper.deleteKeyFromJSON(result, "createdBy");
        response = responseObj.httpSuccessObj(result);
    }
    return resp.sendResponse(res,response);
};

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

    try {
        // Checks if the taskId exists or not
        ifTasksExistsResult = taskHelper.taskExists(req.username, req.params.id);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res,response);
    }

    if(ifTasksExistsResult == -1) {
        response = responseObj.httpErrorObj(CONSTANTS.UPDATE_TASK.TASK_NOT_FOUND, CONSTANTS.STATUS_CODES.NOT_FOUND);
        return resp.sendResponse(res,response);
    }

    // Validating the keys of req body
    validationResult = validator.taskValidator(req.body);

    if(validationResult.length > 0){
        response = responseObj.httpErrorObj(validationResult, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res, response);
    }

    try {
        infoLogger.info(`BEGIN: updateTask service started`);
        updationResult = service.updateTask(req.username, req.params.id, req.body);
        infoLogger.info(`END: updateTask service ended`);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res, response);
    }
    
    response = responseObj.httSuccessMsgObj(CONSTANTS.UPDATE_TASK.UPDATION_SUCCESS);
    return resp.sendResponse(res, response);
};

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

    try {
        // Checks if the taskId exists or not
        ifTasksExistsResult = taskHelper.taskExists(req.username, req.params.id);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res,response);
    }

    if(ifTasksExistsResult == -1) {
        response = responseObj.httpErrorObj(CONSTANTS.DELETE_TASK.TASK_NOT_FOUND, CONSTANTS.STATUS_CODES.NOT_FOUND);
        return resp.sendResponse(res,response);
    }

    try {
        //Check if the task ID is present
        infoLogger.info(`BEGIN: deleteTask service started`);
        taskDeletionResult = service.deleteTask(req.params.id);
        infoLogger.info(`END: deleteTask service ended`);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res,response);
    }

    if(taskDeletionResult == -1) {
        response = responseObj.httpErrorObj(CONSTANTS.DELETE_TASK.TASK_NOT_FOUND, CONSTANTS.STATUS_CODES.NOT_FOUND);
    }
    else if(taskDeletionResult == 1) {
        response = responseObj.httSuccessMsgObj(CONSTANTS.DELETE_TASK.DELETION_SUCCESS);
    }
    return resp.sendResponse(res,response);
};

/**
 * Controller to filter tasks based on title/ priority/ dueDate
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const filterTaskController = (req,res) => {
    validationResult = validator.filterTaskValidator(req.query);

    if(validationResult.length > 0) {
        response = responseObj.httpErrorObj(validationResult, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res, response);
    }

    try {
        infoLogger.info(`BEGIN: filterTask service started`);
        result = service.filterTask(req.username, req.query);
        infoLogger.info(`END: filterTask service ended`);
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res, response);
    }

    if(result.length == 0) {
        response = responseObj.httSuccessMsgObj(CONSTANTS.FILTER_TASK.NO_DATA_FOUND);
        return resp.sendResponse(res, response);
    }
    else {
        result = taskHelper.deleteKeyFromJSON(result, "createdBy");
        response = responseObj.httpSuccessObj(result);
    }

    if(req.query.offset || req.query.limit) {
        paginationValidationResult = validator.paginationKeyValidator(req.query);

        if(paginationValidationResult.length > 0) {
            response = responseObj.httpErrorObj(paginationValidationResult, CONSTANTS.STATUS_CODES.BAD_REQUEST);
            return resp.sendResponse(res, response);
        }
        paginatedResult = taskHelper.paginateResults(req.query, result);
        response = responseObj.httpSuccessObj(paginatedResult);
    }
    return resp.sendResponse(res, response);
};

/**
 * Controller to sort tasks based on title/ priority/ dueDate in asc or desc order
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const sortTaskController = (req,res) => {
    validationResult = validator.filterTaskValidator(req.query);

    if(validationResult.length > 0) {
        response = responseObj.httpErrorObj(validationResult, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res, response);
    }

    validationResult = validator.sortValueValidator(req.query, validationResult);

    if(validationResult.length > 0) {
        response = responseObj.httpErrorObj(validationResult, CONSTANTS.STATUS_CODES.BAD_REQUEST);
        return resp.sendResponse(res, response);
    }

    try {
        infoLogger.info(`BEGIN: sortTask service started`);
        result = service.sortTask(req.username, req.query.criteria, req.query.value);
        infoLogger.info(`END: sortTask service ended`);    
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
        return resp.sendResponse(res, response);
    }
    
    if(result.length == 0) {
        response = responseObj.httpSuccessObj(CONSTANTS.FILTER_TASK.NO_DATA_FOUND);
        return resp.sendResponse(res, response);
    }
    else {
        result = taskHelper.deleteKeyFromJSON(result, "createdBy");
        response = responseObj.httpSuccessObj(result);
    }

    if(req.query.offset || req.query.limit) {
        paginationValidationResult = validator.paginationKeyValidator(req.query);

        if(paginationValidationResult.length > 0) {
            response = responseObj.httpErrorObj(paginationValidationResult, CONSTANTS.STATUS_CODES.BAD_REQUEST);
            return resp.sendResponse(res, response);
        }
        paginatedResult = taskHelper.paginateResults(req.query, result);
        response = responseObj.httpSuccessObj(paginatedResult);
    }
    return resp.sendResponse(res, response);
};

module.exports = { createTaskController, readTasksController, readTaskByIDController, 
    updateTaskController, deleteTaskController};