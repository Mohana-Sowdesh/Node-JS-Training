const fileAccess = require('../modules/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
var fileAccessResponse = "";
let buddies;
var flag = false;
const errLogger = require('../utils/logger');

let deleteBuddy = (req,res) => {
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
        buddies = JSON.parse(fileAccessResponse);
    }
    catch(err){
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send("ERROR : Error in file reading");
    }

    //Storing employee finder in a variable empId
    empId = req.params.empFinder;

    //Splicing the data of the buddy requested by array splicing
    for(let i=0; i<buddies.length; i++) {
        if(buddies[i].employeeId==empId || buddies[i].realName==empId) {
            console.log(empId);
            buddies.splice(i,1);
            flag = true;
        }
    }
    
    try {
        if(flag==true) {
            //Writing data to the file after deletion 
            fileAccess.writeToFile(filePath,buddies);
            res.status(200).send("Buddy deleted"); 
        }
        else{
            res.status(500).send("ERROR : Buddy to be deleted is not found");
            throw new Error("Buddy to be deleted is not found");
        }
    }
    catch(err) {
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send("ERROR : Not able to write to file");
    }
};

module.exports = {deleteBuddy};
