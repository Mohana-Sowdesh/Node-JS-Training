const { infoLogger } = require('../../utils/logger');
const service = require('../../services/taskServices/readTasks.service');
const responseObj = require('../../utils/responseObj');
const resp = require('../../helpers/response');
const CONSTANTS = require('../../helpers/constants');
let response;
/**
 * Controller to read all tasks of a user
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
const readTasksController = (req,res) => {
   //Check if there are tasks and not empty
   infoLogger.info(`BEGIN: readTasks service started`);
   allTasks = service.readTasks(req);
   infoLogger.info(`END: readTasks service ended`);

   if(allTasks == null) {
      response = responseObj.httpErrorObj(CONSTANTS.INTERNAL_SERVER_ERROR_MSG, CONSTANTS.STATUS_CODES.INTERNAL_SERVER_ERROR);
   }
   else if(allTasks.length == 0) {
      response = responseObj.httpSuccessObj(CONSTANTS.READ_ALL_TASKS.NO_TASKS);
   }
   else {
      response = responseObj.httpSuccessObj(allTasks);
   }

   return resp.sendResponse(res,response);
};

module.exports = {readTasksController};