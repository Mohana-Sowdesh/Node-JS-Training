const fileAccess = require('../modules/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
var fileAccessResponse = "";
let buddies = "";
let newBuddy = "";
const errLogger = require('../utils/logger');

let addNewBuddy = (req, res) => {
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
        buddies = JSON.parse(fileAccessResponse);
    }
    catch(err){
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send("ERROR : Error in file reading");
    }

    newBuddy = req.body;

    try {
        var flag = true;
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
        if((/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/).test(newBuddy.dob) == false) {
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
        return res.status(500).send("ERROR : Cannot add buddy");
    }

    if(flag==true) {
        buddies.push(newBuddy);
        console.log(newBuddy);
    
        try {
            //Writing data after adding new buddy
            fileAccess.writeToFile(filePath,buddies);
            res.send("New buddy added");
        }
        catch(err) {
            errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
            return res.status(400).send("ERROR : Not able to write to file");
        }
    }
    else {
        return res.status(500).send("ERROR : Cannot add buddy");
    }
};

module.exports = {addNewBuddy};