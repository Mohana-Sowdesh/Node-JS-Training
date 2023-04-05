const fileAccess = require('../modules/fileAccess');
const filePath = "./cdw_ace23_buddies.json";
var fileAccessResponse = "";
let buddies;
const errLogger = require('../utils/logger');

let displayAllEmployees = ((req, res) => {
    try {
        //Reading cdw_ace23_buddies.json file
        fileAccessResponse = fileAccess.readFromFile(filePath);
        //Storing data in variable buddies
        buddies = JSON.parse(fileAccessResponse);
    }
    catch(err){
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send("ERROR : Error in file reading");
    }

    try {
        if(fileAccessResponse.length > 2) {
            console.log(buddies);
            //Sending buddies data to browser
            res.send(JSON.stringify(buddies));
        }
        else{
            res.status(500).send("ERROR : No buddies in file");
            throw new Error("No buddies in file");
        }
    }
    catch(err) {
        errLogger.error(`${err.status || 400} - ${res.statusMessage} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
        return res.status(400).send("ERROR : Not able to write to file");
    }
});

module.exports = {displayAllEmployees};