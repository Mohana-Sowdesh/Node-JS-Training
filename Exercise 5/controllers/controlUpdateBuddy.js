const fileAccess = require('../services/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
var fileAccessResponse = "";
let empId;
let buddies;
let targetBuddy;
let flag = false;
const errLogger = require('../utils/logger');

const updateBuddy = (req,res) => {
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
        buddies = JSON.parse(fileAccessResponse);
    }
    catch(err){
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send("ERROR : Error in file reading");
    }

     //Fetching employee ID of the buddy to be updated received from query string
    empId = req.params.empFinder;

    //Updating details
    for(let i=0; i<buddies.length; i++) {
        if(buddies[i].employeeId==empId || buddies[i].realName==empId) {
            flag = true;
            targetBuddy = buddies[i];
        }
    }

    try {
        if(flag==true) {
            (req.query.nickname) ? targetBuddy.nickName = JSON.parse(req.query.nickname) : "";
            (req.query.hobbies) ? targetBuddy.hobbies = JSON.parse(req.query.hobbies) : "";
        }
        else {
            throw new Error("Buddy that needs to be updated is not found");
        }

        try {
            //Writing the updated data to file
            fileAccess.writeToFile(filePath,buddies);
            return res.send("SUCCESS : Buddy details updated");
        }
        catch(err) {
            errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            return res.status(400).send("ERROR : Not able to write to file");
        }
    }
    catch(err){
        errLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(500).send("ERROR : Buddy that needs to be updated is not found");
    }

};

module.exports = {updateBuddy};