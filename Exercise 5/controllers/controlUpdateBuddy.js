const fileAccess = require('../helpers/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
var fileAccessResponse = "";
let empId;
let buddies;
const errLogger = require('../utils/logger').errLogger;
const infoLogger = require('../utils/logger').infoLogger;
const messages = require('../modules/constant');
const service = require('../services/serviceUpdateBuddy');

const updateBuddyController = (req,res) => {
    
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
        buddies = JSON.parse(fileAccessResponse);
    }
    catch(err){
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send(messages.fileReadError);
    }

     //Fetching employee ID of the buddy to be updated received from query string
    empId = req.params.empFinder;

    infoLogger.info(`BEGIN: updateBuddy service started`);
    //Calling updateBuddy service
    response = service.updateBuddy(req, buddies, empId);
    infoLogger.info(`END: updateBuddy service ended`);

    try {
        if(response[0]==false) {
            throw new Error("Buddy that needs to be updated is not found");
        }

        try {
            //Writing the updated data to file
            fileAccess.writeToFile(filePath,response[1]);
            return res.send(messages.updateBuddySuccess);
        }
        catch(err) {
            errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            return res.status(400).send(messages.fileWriteError);
        }
    }
    catch(err){
        errLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(500).send(messages.updateBuddyError);
    }

};

module.exports = {updateBuddyController};