const fileAccess = require('../helpers/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
var fileAccessResponse = "";
let buddies;
var flag;
const errLogger = require('../utils/logger').errLogger;
const infoLogger = require('../utils/logger').infoLogger;
const messages = require('../modules/constant');
const service = require('../services/serviceDeleteBuddy');

let deleteBuddyController = (req,res) => {

    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
        buddies = JSON.parse(fileAccessResponse);
    }
    catch(err){
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send(messages.fileReadError);
    }

    //Storing employee finder in a variable empId
    empId = req.params.empFinder;

    infoLogger.info(`BEGIN: deleteBuddy service started`);
    //Calling deleteBuddy service
    flag = service.deleteBuddy(buddies, empId);
    infoLogger.info(`END: deleteBuddy service ended`);
    
    try {
        if(flag==true) {
            //Writing data to the file after deletion 
            fileAccess.writeToFile(filePath,buddies);
            res.send(messages.buddyDeletionSuccess);
        }
        else{
            throw new Error("Buddy to be deleted is not found");
        }
    }
    catch(err) {
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        res.status(500).send(messages.buddyDeletionError);
    }
 
};

module.exports = {deleteBuddyController};
