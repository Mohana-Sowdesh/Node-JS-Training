const {errLogger} = require('../utils/logger');
const fileAccess = require('../helpers/fileAccess');
const APP_CONSTANTS = require('../helpers/appConstants');

/**
 * Method to read all tasks of a user
 * @param {*} req 
 * @returns 
 */
const getUserTaskList = (username) => {
    let userTasks =  null;
    try {
        //Reading tasks.json file
        fileAccessResponse = fileAccess.readFromFile(__dirname + APP_CONSTANTS.TASKS_FILE_PATH);
        allTasks = JSON.parse(fileAccessResponse);
        userTasks = allTasks.filter(task => task.createdBy == username);
    }
    catch(err) {
        throw err;
    }
    return userTasks;
}

/**
 * Function to add current timestamp to each comment
 * @param {*} taskData 
 * @returns taskData
 */
const addTimestampsToComments = (taskData) => {
    taskData.comments.forEach(comment => {
        if(!comment.hasOwnProperty("timestamp")) {
            comment.timestamp = new Date().toISOString(); 
        }
    });
    return taskData;
}

/**
 * Method to find the index of a task
 * @param {*} req 
 * @param {*} incomingTaskId 
 * @returns 
 */
const findTaskIndex = (incomingTaskId) => {
    let allTasks =  null;
    try {
        //Reading tasks.json file
        fileAccessResponse = fileAccess.readFromFile(__dirname + APP_CONSTANTS.TASKS_FILE_PATH);
        allTasks = JSON.parse(fileAccessResponse);
    }
    catch(err) {
        throw err;
    }

    for(let i=0; i < userTasks.length; i++) {
        if(allTasks[i].taskId === incomingTaskId)
            return i;
    }
    return -1;
}

/**
 * Method to paginate the task results
 * @param {*} queryParams 
 * @param {*} taskList 
 * @returns 
 */
const paginateResults = (queryParams, taskList) => {
    let totalRecords = taskList.length; 
    let curPage = parseInt(queryParams.offset) - 1; 
    let pageLimit = parseInt(queryParams.limit); 
    let totalPages = Math.ceil(totalRecords/pageLimit);
    let startIndex = curPage * pageLimit;
    let endIndex = Math.min((curPage + 1) * pageLimit, totalRecords)

    let paginatedData = taskList.slice(startIndex, endIndex);
    let result = {
                    totalRecords: totalRecords,
                    curPage: curPage + 1 ,
                    pageLimit: pageLimit,
                    totalPages: totalPages,
                    result: paginatedData
                 };

    return result;
}

/**
 * Method to delete a key from result JSON
 * @param {*} taskDetails 
 * @param {*} prop 
 * @returns 
 */
const deleteKeyFromJSON = (taskDetails, prop) => {
    taskDetails.forEach((task) => {
        delete task[prop];
    });
    return taskDetails;
}

/**
 * Method to find the index of a task
 * @param {*} req 
 * @param {*} incomingTaskId 
 * @returns 
 */
const taskExists = (username, incomingTaskId) => {
    try {
        userTasks = getUserTaskList(username);
    }
    catch(err) {
        throw err;
    }

    for(let i=0; i < userTasks.length; i++) {
        if(userTasks[i].taskId === incomingTaskId)
            return i;
    }
    return -1;
}

module.exports = { findTaskIndex, getUserTaskList, paginateResults, 
    addTimestampsToComments, deleteKeyFromJSON, taskExists };