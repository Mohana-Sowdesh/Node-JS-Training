const APP_CONSTANTS = require('../helpers/appConstants');
const { errLogger } = require('../utils/logger');
const fileAccess = require('../helpers/fileAccess');
const { getUserTaskList } = require('../helpers/taskHelper');
const taskHelper = require('../helpers/taskHelper');

/**
 * Service to add taskDetails for the user and write it to tasks file
 * @param {*} username 
 * @param {*} taskDetail 
 */
const createTask = (taskDetails) => {
    try {
        fileAccessResponse = fileAccess.readFromFile(__dirname + APP_CONSTANTS.TASKS_FILE_PATH);
    }
    catch(err) {
        throw err;
    }

    fileAccessResponse = JSON.parse(fileAccessResponse);
    fileAccessResponse.push(taskDetails)
    
    try {
        fileAccess.writeToFile((__dirname + APP_CONSTANTS.TASKS_FILE_PATH), fileAccessResponse);
    }
    catch(err) {
        throw err;
    }
}

/**
 * Service to read all tasks for a particular user
 * @returns - list of all tasks for a particular user
 */
const readTasks = (username) => {
    try {
        userTasks = getUserTaskList(username);
    }
    catch(err) {
        throw err;
    }
    return userTasks;
}

/**
 * Service to read a task of a particular user by taskID
 * @param {*} req 
 * @param {*} incomingTaskId 
 * @returns 
 */
const readTaskByID = (username, incomingTaskId) => {
    let result = null;
    try {
        userTasks = getUserTaskList(username);
        result = [];
        result = userTasks.filter(task => task.taskId == incomingTaskId);
    }
    catch(err) {
        throw err;
    }
    return result;
}


/**
 * Service to update an existing task based on the taskId received as path param
 * @param {*} req 
 * @returns 
 */
const updateTask = (username, taskToBeUpdated, reqBody) => {
    try {
        fileAccessResponse = fileAccess.readFromFile(__dirname + APP_CONSTANTS.TASKS_FILE_PATH);
    }
    catch(err) {
        throw err;
    }

    allTasks = JSON.parse(fileAccessResponse);
    try {
        updationTaskIndex = taskHelper.findTaskIndex(taskToBeUpdated);
    }
    catch(err) {
        throw err;
    }

    taskDetail = reqBody;
    taskDetail.taskId = allTasks[updationTaskIndex].taskId;
    taskDetail.createdBy = username;
    taskDetail = taskHelper.addTimestampsToComments(taskDetail);
    // Re-assigning the task with updated details
    allTasks[updationTaskIndex] = taskDetail;
    
    try {
        fileAccess.writeToFile((__dirname + APP_CONSTANTS.TASKS_FILE_PATH), allTasks);
    }
    catch(err) {
        throw err;
    }
}

/**
 * Service to delete a task by taskId
 * @param {*} req 
 * @param {*} taskToBeDeleted 
 * @returns 
 */
const deleteTask = (taskToBeDeleted) => {
    try {
        //Reading tasks.json file
        fileAccessResponse = fileAccess.readFromFile(__dirname + APP_CONSTANTS.TASKS_FILE_PATH);
        allTasks = JSON.parse(fileAccessResponse);
    }
    catch(err) {
        throw err;
    }

    try {
        deletionTaskIndex = taskHelper.findTaskIndex(taskToBeDeleted);
    }
    catch(err) {
        throw err;
    }

    allTasks.splice(deletionTaskIndex, 1);

    try {
        fileAccess.writeToFile((__dirname + APP_CONSTANTS.TASKS_FILE_PATH), allTasks);
    }
    catch(err) {
        throw err;
    }
    return 1;
}

/**
 * Service to filter tasks based on title/ priority/ dueDate
 * @param {*} req 
 * @param {*} queryParams 
 * @returns 
 */
const filterTask = (username, queryParams) => {
    let result = [];

    try {
        userTasks = taskHelper.getUserTaskList(username);
    }
    catch(err) {
        throw err;
    }

    result = userTasks.filter((userTask) => userTask[queryParams.criteria].toLowerCase() == queryParams.value.toLowerCase());
    return result;
}

/**
 * Service to sort tasks based on title/ priority/ dueDate in asc or desc order
 * @param {*} req 
 * @returns 
 */
const sortTask = (username, sortCriteria, sortValue) => {
    let result = [];

    try {
        userTasks = taskHelper.getUserTaskList(username);
    }
    catch(err) {
        throw err;
    }

    if(sortValue.toLowerCase() == 'asc')
        result = userTasks.sort((a, b) => a[sortCriteria].localeCompare(b[sortCriteria]));
    else
        result = userTasks.sort((a, b) => b[sortCriteria].localeCompare(a[sortCriteria]));
    return result;
}   

module.exports = { createTask, readTasks, readTaskByID, updateTask, deleteTask, filterTask, sortTask};
