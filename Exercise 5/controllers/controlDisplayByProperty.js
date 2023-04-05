const fileAccess = require('../modules/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
var fileAccessResponse = "";
let flag = false;
let targetBuddy;
const errLogger = require('../utils/logger');

const displayByProperty = (req, res) => {
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
    }
    catch(err){
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send("ERROR : Error in file reading");
    }
    
    let empId;
    let buddies;

    //Fetching employee ID received from query string 
    empId = req.params.id;
    buddies = JSON.parse(fileAccessResponse);
    let i=0;

    //Traversing the array to find the required buddy
    for(i=0; i<buddies.length; i++) {
        if(buddies[i].employeeId==empId){
            targetBuddy = buddies[i];
            flag = true;
        }
    } 

    try{
        if(flag==true) {
            console.log(targetBuddy);
            res.json(targetBuddy);
        }
        else {
            throw new Error("Requested buddy not found");
        }
    }
    catch(err){
        errLogger.error(`${err.status || 500} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return es.status(500).send("ERROR : Requested buddy not found");
    }
    
};

module.exports = {displayByProperty};