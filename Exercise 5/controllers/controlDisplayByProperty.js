const fileAccess = require('../helpers/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
var fileAccessResponse = "";
const errLogger = require('../utils/logger').errLogger;
const infoLogger = require('../utils/logger').infoLogger;
const messages = require('../modules/constant');
const service = require('../services/serviceDisplayByProperty');

const displayByPropertyController = (req, res) => {
    
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
    }
    catch(err){
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send(messages.fileReadError);
    }
    
    let empId;
    let buddies;

    //Fetching employee ID received from query string 
    empId = req.params.id;
    buddies = JSON.parse(fileAccessResponse);
    
    infoLogger.info(`BEGIN: displayByProperty service started`);
    //Calling displayByProperty service
    response = service.displayByProperty(buddies, empId);
    infoLogger.info(`END: displayByProperty service ended`);

    try{
        if(response[0]==true) {
            res.json(response[1]);
        }
        else {
            throw new Error("Requested buddy not found");
        }
    }
    catch(err){
        errLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(500).send(messages.displayByPropertyError);
    }
    
};

module.exports = {displayByPropertyController};