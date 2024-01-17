const {errLogger} = require('../utils/logger');
const fileAccess = require('../helpers/fileAccess');
let tasksFilePath = '/../data/tasks.json';

/**
 * Method to read all tasks of a user
 * @param {*} req 
 * @returns 
 */
const getUserTaskList = (req) => {
    let userTasks =  null;
    try {
        //Reading tasks.json file
        fileAccessResponse = fileAccess.readFromFile(__dirname + tasksFilePath);
        allTasks = JSON.parse(fileAccessResponse);
        userTasks = allTasks[req.username];
    }
    catch(err) {
        errLogger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    }
    return userTasks;
}

/**
 * Method to check if the taskId is already present
 * @param {*} req 
 * @param {*} incomingTaskId 
 * @returns 
 */
const taskExists = (req, incomingTaskId) => {
    userTasks = getUserTaskList(req);

    if(userTasks == null)
        return -2;

    for(let i=0; i < userTasks.length; i++) {
        if(userTasks[i].taskId === incomingTaskId)
            return 1;
    }
    return -1;
}

/**
 * Method to find the index of a task
 * @param {*} req 
 * @param {*} incomingTaskId 
 * @returns 
 */
const findTaskIndex = (req, incomingTaskId) => {
    userTasks = getUserTaskList(req);

    if(userTasks == null)
        return -2;

    for(let i=0; i < userTasks.length; i++) {
        if(userTasks[i].taskId === incomingTaskId)
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

module.exports = { taskExists, findTaskIndex, getUserTaskList, paginateResults };