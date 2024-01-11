const taskHelper = require('../../helpers/taskHelper');
const APP_CONSTANTS = require('../../helpers/appConstants');

/**
 * Service to sort tasks based on title/ priority/ dueDate in asc or desc order
 * @param {*} req 
 * @returns 
 */
const sortTask = (req) => {
    let result = { code: APP_CONSTANTS.SUCCESS_CODE, data: []};
    const sortCriteria = req.query.criteria;

    userTasks = taskHelper.getUserTaskList(req);
    if(userTasks == null) {
        result.code = APP_CONSTANTS.FILE_READ_WRITE_ERROR_CODE;
        return result;
    }
    
    if(req.query.value.toLowerCase() == 'asc')
        result.data = userTasks.sort((a, b) => a[sortCriteria].localeCompare(b[sortCriteria]));
    else
        result.data = userTasks.sort((a, b) => b[sortCriteria].localeCompare(a[sortCriteria]));
    return result;
}   

module.exports = {sortTask};