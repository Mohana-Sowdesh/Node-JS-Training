const taskHelper = require('../../helpers/taskHelper');
const APP_CONSTANTS = require('../../helpers/appConstants');

/**
 * Service to filter tasks based on title/ priority/ dueDate
 * @param {*} req 
 * @param {*} queryParams 
 * @returns 
 */
const filterTask = (req, queryParams) => {
    let result = { code: APP_CONSTANTS.SUCCESS_CODE, data: []};

    userTasks = taskHelper.getUserTaskList(req);
    if(userTasks == null) {
        result.code = APP_CONSTANTS.FILE_READ_WRITE_ERROR_CODE;
        return result;
    }

    result.data = userTasks.filter((userTask) => userTask[queryParams.criteria].toLowerCase() == queryParams.value.toLowerCase());
    return result;
}

module.exports = {filterTask};