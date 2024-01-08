const fileAccess = require('../../helpers/fileAccess');
const filePath = "data/tasks.json";
const {errLogger, infoLogger} = require('../../utils/logger');
const service = require('../../services/taskServices/createTask.service');

const createTaskController = (req,res) => {
    let content;
    let fileAccessResponse;

    try {
        fileAccessResponse = fileAccess.readFromFile(filePath);
    }
    catch(err){
        errLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send(messages.fileReadError);
    }

    content = JSON.parse(fileAccessResponse);

    infoLogger.info(`BEGIN: createTask service started`);
    service.createTask(content, req.body);
    infoLogger.info(`END: createTask service ended`);

    res.send("Message from create task");
};

module.exports = {createTaskController};