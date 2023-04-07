const fileAccess = require('../helpers/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
var fileAccessResponse = "";
let buddies;
const errLogger = require('../utils/logger').errLogger;
const infoLogger = require('../utils/logger').infoLogger;
const messages = require('../modules/constant');
const service = require('../services/serviceDisplayAllBuddies');

let displayAllBuddiesController = ((req, res) => {

    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
    }
    catch(err){
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send(messages.fileReadError);
    }

    infoLogger.info(`BEGIN: displayAllBuddies service started`);
    //Calling displayAllBuddies service
    buddies = service.displayAllBuddies(fileAccessResponse);
    infoLogger.info(`END: displayAllBuddies service ended`);

    try {
        if(fileAccessResponse.length > 2) {
            //Sending buddies data to browser
            return res.send(JSON.stringify(buddies));
        }
        else{
            throw new Error("No buddies in file");
        }
    }
    catch(err) {
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(500).send(messages.noBuddyError);
    }
});

module.exports = {displayAllBuddiesController};