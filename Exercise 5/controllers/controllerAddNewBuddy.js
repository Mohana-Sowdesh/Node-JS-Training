const fileAccess = require('../helpers/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
var fileAccessResponse = "";
let buddies = "";
let newBuddy = "";
const errLogger = require('../utils/logger').errLogger;
const infoLogger = require('../utils/logger').infoLogger;
const messages = require('../modules/constant');
const service = require('../services/serviceAddNewBuddy');

let addNewBuddyController = (req, res) => {
    
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
        buddies = JSON.parse(fileAccessResponse);
    }
    catch(err){
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send(messages.fileReadError);
    }

    newBuddy = req.body;

    try {
        var flag = true;
        //Check if buddy already exists
        for(var i=0; i<buddies.length; i++){
            if(buddies[i].employeeId == newBuddy.employeeId){
                flag = false;
                throw new Error("Buddy already exists");
            }
        }
        //Validation for new buddy
        if((/^\d{4}$/).test(newBuddy.employeeId) == false) {
            flag = false;
            throw new Error("Employee ID must be only 4 digits");
        }
        if((/^[A-Za-z ]+$/).test(newBuddy.realName) == false){
            flag = false;
            throw new Error("Name should contain only alphabets");
        }
        if((/^[A-Za-z ]+$/).test(newBuddy.nickName) == false) {
            flag = false;
            throw new Error("Nickname should contain only alphabets");
        }
        if((/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/).test(newBuddy.dob) == false) {
            flag = false;
            throw new Error("Please enter a valid date");
        }
        if((/^[A-Za-z ]+$/).test(newBuddy.hobbies) == false) {
            flag = false;
            throw new Error("Please enter a valid hobby");
        }
    }
    catch(err){
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send(messages.addNewBuddyError);
    }

    if(flag==true) {
        infoLogger.info(`BEGIN: addNewBuddy service started`);
        //Calling addNewBuddy service
        buddies = service.addNewBuddy(buddies, newBuddy);
        infoLogger.info(`END: addNewBuddy service ended`);
    
        try {
            //Writing data after adding new buddy
            fileAccess.writeToFile(filePath,buddies);
            return res.send(messages.addNewBuddySuccess);
        }
        catch(err) {
            errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            return res.status(400).send(messages.fileWriteError);
        }
    }
    else {
        return res.status(400).send(messages.addNewBuddyError);
    }
};

module.exports = {addNewBuddyController};